"""Validation helpers for ridge regression."""

from __future__ import annotations

from typing import Any

import numpy as np

from .exceptions import NotFittedError, ValidationError


def validate_alpha(alpha: Any) -> float:
    if not np.isscalar(alpha):
        raise ValidationError("alpha must be a scalar")
    try:
        alpha_value = np.asarray(alpha, dtype=np.float64).item()
    except (TypeError, ValueError) as exc:
        raise ValidationError("alpha must be a real-valued scalar") from exc
    if not np.isfinite(alpha_value):
        raise ValidationError("alpha must be finite")
    if alpha_value < 0.0:
        raise ValidationError("alpha must be non-negative")
    return alpha_value


def validate_solver(solver: Any) -> str:
    if solver not in {"closed_form", "gradient_descent"}:
        raise ValidationError("solver must be 'closed_form' or 'gradient_descent'")
    return str(solver)


def validate_optimization_params(max_iter: Any, tol: Any) -> tuple[int, float]:
    if not isinstance(max_iter, int) or max_iter <= 0:
        raise ValidationError("max_iter must be a positive integer")
    try:
        tol_value = float(tol)
    except (TypeError, ValueError) as exc:
        raise ValidationError("tol must be a positive float") from exc
    if not np.isfinite(tol_value) or tol_value <= 0.0:
        raise ValidationError("tol must be a positive float")
    return max_iter, tol_value


def validate_X(X: Any, n_features_expected: int | None = None) -> np.ndarray:
    X_array = np.asarray(X, dtype=np.float64)
    if X_array.ndim != 2:
        raise ValidationError("X must be a 2D array-like")
    if X_array.shape[0] == 0 or X_array.shape[1] == 0:
        raise ValidationError("X must have at least one sample and one feature")
    if not np.isfinite(X_array).all():
        raise ValidationError("X contains NaN or infinite values")
    if n_features_expected is not None and X_array.shape[1] != n_features_expected:
        raise ValidationError(
            f"X has {X_array.shape[1]} features, but model expects {n_features_expected}"
        )
    return X_array


def validate_y(y: Any, n_samples: int) -> np.ndarray:
    y_array = np.asarray(y, dtype=np.float64)
    if y_array.ndim != 1:
        raise ValidationError("y must be a 1D array-like")
    if y_array.shape[0] != n_samples:
        raise ValidationError("X and y must contain the same number of samples")
    if not np.isfinite(y_array).all():
        raise ValidationError("y contains NaN or infinite values")
    return y_array


def validate_X_y(X: Any, y: Any) -> tuple[np.ndarray, np.ndarray]:
    X_array = validate_X(X)
    y_array = validate_y(y, X_array.shape[0])
    return X_array, y_array


def check_is_fitted(model: Any, attributes: tuple[str, ...] = ("coef_", "intercept_")) -> None:
    for attr in attributes:
        if not hasattr(model, attr) or getattr(model, attr) is None:
            raise NotFittedError("Model is not fitted yet. Call fit before predict/score")
