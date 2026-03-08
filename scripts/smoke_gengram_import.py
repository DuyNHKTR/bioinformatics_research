from __future__ import annotations

import json
from pathlib import Path
import sys

import torch


def main() -> None:
    repo_root = Path.cwd()
    if str(repo_root) not in sys.path:
        sys.path.insert(0, str(repo_root))

    import megatron
    import megatron.core
    import gpt_builders
    import model_provider

    result = {
        "torch_version": torch.__version__,
        "cuda_available": torch.cuda.is_available(),
        "megatron_module": getattr(megatron, "__file__", None),
        "megatron_core_module": getattr(megatron.core, "__file__", None),
        "gpt_builders_module": getattr(gpt_builders, "__file__", None),
        "model_provider_module": getattr(model_provider, "__file__", None),
    }

    out_path = Path("gengram_import_smoke_result.json")
    out_path.write_text(json.dumps(result, indent=2), encoding="utf-8")
    print(json.dumps(result, indent=2))
    print(f"Saved smoke result to {out_path.resolve()}")


if __name__ == "__main__":
    main()
