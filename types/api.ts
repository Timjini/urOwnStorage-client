export interface JsonApiResource<T> {
  id: string;
  type: string;
  attributes: T;
}

export interface JsonApiResponse<T> {
  data: JsonApiResource<T>[];
}