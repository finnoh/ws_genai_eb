import numpy as np

from ridge_regression import RidgeRegression


def main() -> None:
    X = np.array(
        [
            [1.0, 2.0],
            [2.0, 1.0],
            [3.0, 4.0],
            [4.0, 3.0],
            [5.0, 5.0],
        ]
    )
    y = np.array([4.2, 4.1, 8.1, 8.2, 10.9])

    model = RidgeRegression(alpha=1.0, fit_intercept=True)
    model.fit(X, y)

    predictions = model.predict(np.array([[6.0, 6.0], [7.0, 5.0]]))

    print("coef_:", model.coef_)
    print("intercept_:", model.intercept_)
    print("predictions:", predictions)
    print("train_r2:", model.score(X, y))


if __name__ == "__main__":
    main()
