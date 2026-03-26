import pytest

from ridge_regression.exceptions import ValidationError
from ridge_regression.validation import (
    validate_alpha,
    validate_optimization_params,
    validate_solver,
)


def test_validate_alpha_rejects_negative() -> None:
    with pytest.raises(ValidationError):
        validate_alpha(-0.1)


def test_validate_solver_rejects_unknown() -> None:
    with pytest.raises(ValidationError):
        validate_solver("abc")


def test_validate_optimization_params_rejects_invalid_values() -> None:
    with pytest.raises(ValidationError):
        validate_optimization_params(0, 1e-5)
    with pytest.raises(ValidationError):
        validate_optimization_params(100, 0.0)
