import { useState, useCallback } from "react";

type UseControllableStateParams<T> = {
	prop?: T;
	onChange?: (state: T) => void;
	initialValue?: T;
};

export function useControllableState<T>({
	prop,
	onChange,
	initialValue,
}: UseControllableStateParams<T>) {
	const [uncontrolledState, setUncontrolledState] = useState(initialValue);
	const isControlled = prop !== undefined;
	const value = isControlled ? prop : uncontrolledState;

	const setValue = useCallback(
		(nextValue: T | ((prevState: T) => T)) => {
			const setter = (prev: T) => {
				const next =
					typeof nextValue === "function"
						? (nextValue as (prevState: T) => T)(prev)
						: nextValue;

				if (!isControlled) {
					setUncontrolledState(next);
				}
				onChange?.(next);
				return next;
			};

			setUncontrolledState((prev) => setter(prev as T));
		},
		[isControlled, onChange]
	);

	return [value, setValue] as const;
}
