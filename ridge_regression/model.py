"""Ridge regression estimator."""

from __future__ import annotations

from typing import Any

import numpy as np

from .metrics import r2_score
from .solvers import solve_ridge_closed_form, solve_ridge_gradient_descent
from .validation import (
    check_is_fitted,
    validate_X,
    validate_X_y,
    validate_alpha,
    validate_optimization_params,
    validate_solver,
)


class RidgeRegressor:
    def __init__(
        self,
        alpha: float = 1.0,
        fit_intercept: bool = True,
        solver: str = "closed_form",
        max_iter: int = 1000,
        tol: float = 1e-6,
        random_state: int | None = None,
    ) -> None:
        self.alpha = validate_alpha(alpha)
        self.fit_intercept = fit_intercept
        self.solver = validate_solver(solver)
        self.max_iter, self.tol = validate_optimization_params(max_iter, tol)
        self.random_state = random_state
        self.coef_: np.ndarray | None = None
        self.intercept_: float | None = None
        self.n_features_in_: int | None = None
        self.is_fitted_: bool = False

    def fit(self, X: Any, y: Any) -> "RidgeRegressor":
        X_array, y_array = validate_X_y(X, y)
        _, n_features = X_array.shape

        if self.solver == "closed_form":
            coef, intercept = solve_ridge_closed_form(
                X_array,
                y_array,
                alpha=self.alpha,
                fit_intercept=self.fit_intercept,
            )
        else:
            coef, intercept = solve_ridge_gradient_descent(
                X_array,
                y_array,
                alpha=self.alpha,
                fit_intercept=self.fit_intercept,
                max_iter=self.max_iter,
                tol=self.tol,
                random_state=self.random_state,
            )

        self.coef_ = coef
        self.intercept_ = intercept
        self.n_features_in_ = n_features
        self.is_fitted_ = True
        return self

    def predict(self, X: Any) -> np.ndarray:
        check_is_fitted(self)
        X_array = validate_X(X, n_features_expected=self.n_features_in_)
        return X_array @ self.coef_ + self.intercept_

    def score(self, X: Any, y: Any) -> float:
        check_is_fitted(self)
        y_true = np.asarray(y, dtype=np.float64)
        if y_true.ndim != 1:
            raise ValueError("y must be a 1D array-like")
        y_pred = self.predict(X)
        if y_true.shape[0] != y_pred.shape[0]:
            raise ValueError("X and y must contain the same number of samples")
        return r2_score(y_true, y_pred)

    def get_params(self) -> dict[str, Any]:
        return {
            "alpha": self.alpha,
            "fit_intercept": self.fit_intercept,
            "solver": self.solver,
            "max_iter": self.max_iter,
            "tol": self.tol,
            "random_state": self.random_state,
        }

    def set_params(self, **params: Any) -> "RidgeRegressor":
        for key, value in params.items():
            if not hasattr(self, key):
                raise ValueError(f"Unknown parameter: {key}")
            setattr(self, key, value)
        self.alpha = validate_alpha(self.alpha)
        self.solver = validate_solver(self.solver)
        self.max_iter, self.tol = validate_optimization_params(self.max_iter, self.tol)
        return self


class RidgeRegression(RidgeRegressor):
    """Backward-compatible alias for previous class name."""
