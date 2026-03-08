from __future__ import annotations

import json
from pathlib import Path

import torch
from transformers import AutoModel, AutoTokenizer
from transformers.models.bert.configuration_bert import BertConfig


MODEL_ID = "zhihan1996/DNABERT-2-117M"
DNA = "ACGTAGCATCGGATCTATCTATCGACACTTGGTTATCGATCTACGAGCATCTCGTTAGC"


def main() -> None:
    tokenizer = AutoTokenizer.from_pretrained(MODEL_ID, trust_remote_code=True)

    try:
        model = AutoModel.from_pretrained(MODEL_ID, trust_remote_code=True)
    except Exception:
        config = BertConfig.from_pretrained(MODEL_ID)
        model = AutoModel.from_pretrained(MODEL_ID, trust_remote_code=True, config=config)

    model.eval()

    device = "cuda" if torch.cuda.is_available() else "cpu"
    model.to(device)

    encoded = tokenizer(DNA, return_tensors="pt")
    input_ids = encoded["input_ids"].to(device)

    with torch.inference_mode():
        hidden_states = model(input_ids)[0]

    embedding_mean = torch.mean(hidden_states[0], dim=0)
    embedding_max = torch.max(hidden_states[0], dim=0)[0]

    result = {
        "model_id": MODEL_ID,
        "device": device,
        "input_shape": list(input_ids.shape),
        "hidden_shape": list(hidden_states.shape),
        "embedding_mean_shape": list(embedding_mean.shape),
        "embedding_max_shape": list(embedding_max.shape),
        "embedding_mean_norm": float(torch.linalg.vector_norm(embedding_mean).item()),
        "embedding_max_norm": float(torch.linalg.vector_norm(embedding_max).item()),
    }

    out_path = Path("dnabert2_smoke_result.json")
    out_path.write_text(json.dumps(result, indent=2), encoding="utf-8")
    print(json.dumps(result, indent=2))
    print(f"Saved smoke result to {out_path.resolve()}")


if __name__ == "__main__":
    main()
