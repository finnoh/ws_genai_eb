"""Basic usage example for the ridge regression module."""

from __future__ import annotations

import pathlib
import sys

import numpy as np

sys.path.append(str(pathlib.Path(__file__).resolve().parents[1]))

from ridge_regression import RidgeRegressor, mean_squared_error


def main() -> None:
    rng = np.random.default_rng(42)
    n_samples = 200

    x1 = rng.normal(size=n_samples)
    x2 = x1 + rng.normal(scale=0.2, size=n_samples)
    X = np.column_stack([x1, x2])
    y = 3.0 * x1 - 1.5 * x2 + 0.8 + rng.normal(scale=0.3, size=n_samples)

    split = int(0.8 * n_samples)
    X_train, X_test = X[:split], X[split:]
    y_train, y_test = y[:split], y[split:]

    for alpha in (0.1, 1.0, 10.0):
        model = RidgeRegressor(alpha=alpha, fit_intercept=True)
        model.fit(X_train, y_train)
        pred = model.predict(X_test)

        test_mse = mean_squared_error(y_test, pred)
        coef_norm = np.linalg.norm(model.coef_)

        print(f"alpha={alpha:>4}: test_mse={test_mse:.4f}, coef_norm={coef_norm:.4f}")


if __name__ == "__main__":
    main()
