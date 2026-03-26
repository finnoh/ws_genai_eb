"""Solver implementations for ridge regression."""

from __future__ import annotations

from typing import Any

import numpy as np


def solve_ridge_closed_form(
    X: np.ndarray,
    y: np.ndarray,
    alpha: float,
    fit_intercept: bool,
) -> tuple[np.ndarray, float]:
    n_samples, n_features = X.shape
    if fit_intercept:
        X_mean = np.mean(X, axis=0)
        y_mean = float(np.mean(y))
        X_centered = X - X_mean
        y_centered = y - y_mean
    else:
        X_centered = X
        y_centered = y
        X_mean = np.zeros(n_features, dtype=np.float64)
        y_mean = 0.0

    gram = X_centered.T @ X_centered
    rhs = X_centered.T @ y_centered
    reg = alpha * np.eye(n_features, dtype=np.float64)
    coef = np.linalg.solve(gram + reg, rhs)
    intercept = float(y_mean - X_mean @ coef) if fit_intercept else 0.0
    return coef, intercept


def solve_ridge_gradient_descent(
    X: np.ndarray,
    y: np.ndarray,
    alpha: float,
    fit_intercept: bool,
    max_iter: int,
    tol: float,
    random_state: Any = None,
) -> tuple[np.ndarray, float]:
    n_samples, n_features = X.shape
    rng = np.random.default_rng(random_state)

    coef = rng.normal(0.0, 0.01, size=n_features)
    intercept = 0.0

    lipschitz = (np.linalg.norm(X, ord=2) ** 2) + alpha
    lr = 1.0 / max(lipschitz, 1e-12)

    for _ in range(max_iter):
        preds = X @ coef + intercept
        residuals = preds - y

        grad_coef = (X.T @ residuals) + alpha * coef
        new_coef = coef - lr * grad_coef

        if fit_intercept:
            grad_intercept = float(np.sum(residuals))
            new_intercept = intercept - lr * grad_intercept
        else:
            new_intercept = 0.0

        step_size = max(
            float(np.linalg.norm(new_coef - coef)),
            abs(new_intercept - intercept),
        )
        coef = new_coef
        intercept = new_intercept

        if step_size < tol:
            break

    return coef, float(intercept)
