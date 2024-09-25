// Generic Map Tuple type
type MapEntry<T> = [string, T];

// Convert the MapEntry tuple to an object with id and other properties
export const mapEntry =
	(fieldName = 'id') =>
	<T>([id, obj]: MapEntry<T>) => ({
		[fieldName]: id,
		...obj,
	});
