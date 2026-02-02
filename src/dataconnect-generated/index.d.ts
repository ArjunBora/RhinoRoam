import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, MutationRef, MutationPromise } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;




export interface AddMovieToListData {
  listMovie_insert: ListMovie_Key;
}

export interface AddMovieToListVariables {
  listId: UUIDString;
  movieId: UUIDString;
  position: number;
  note?: string | null;
}

export interface CreateNewListData {
  list_insert: List_Key;
}

export interface CreateNewListVariables {
  name: string;
  description: string;
  public: boolean;
}

export interface GetMyReviewsData {
  reviews: ({
    id: UUIDString;
    rating: number;
    review?: string | null;
    movie: {
      id: UUIDString;
      title: string;
    } & Movie_Key;
  } & Review_Key)[];
}

export interface GetPublicListsData {
  lists: ({
    id: UUIDString;
    name: string;
    description?: string | null;
    createdAt: TimestampString;
    updatedAt: TimestampString;
  } & List_Key)[];
}

export interface ListMovie_Key {
  id: UUIDString;
  __typename?: 'ListMovie_Key';
}

export interface List_Key {
  id: UUIDString;
  __typename?: 'List_Key';
}

export interface Movie_Key {
  id: UUIDString;
  __typename?: 'Movie_Key';
}

export interface Review_Key {
  id: UUIDString;
  __typename?: 'Review_Key';
}

export interface User_Key {
  id: UUIDString;
  __typename?: 'User_Key';
}

export interface Watch_Key {
  id: UUIDString;
  __typename?: 'Watch_Key';
}

interface AddMovieToListRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: AddMovieToListVariables): MutationRef<AddMovieToListData, AddMovieToListVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: AddMovieToListVariables): MutationRef<AddMovieToListData, AddMovieToListVariables>;
  operationName: string;
}
export const addMovieToListRef: AddMovieToListRef;

export function addMovieToList(vars: AddMovieToListVariables): MutationPromise<AddMovieToListData, AddMovieToListVariables>;
export function addMovieToList(dc: DataConnect, vars: AddMovieToListVariables): MutationPromise<AddMovieToListData, AddMovieToListVariables>;

interface GetPublicListsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetPublicListsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<GetPublicListsData, undefined>;
  operationName: string;
}
export const getPublicListsRef: GetPublicListsRef;

export function getPublicLists(): QueryPromise<GetPublicListsData, undefined>;
export function getPublicLists(dc: DataConnect): QueryPromise<GetPublicListsData, undefined>;

interface CreateNewListRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateNewListVariables): MutationRef<CreateNewListData, CreateNewListVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateNewListVariables): MutationRef<CreateNewListData, CreateNewListVariables>;
  operationName: string;
}
export const createNewListRef: CreateNewListRef;

export function createNewList(vars: CreateNewListVariables): MutationPromise<CreateNewListData, CreateNewListVariables>;
export function createNewList(dc: DataConnect, vars: CreateNewListVariables): MutationPromise<CreateNewListData, CreateNewListVariables>;

interface GetMyReviewsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetMyReviewsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<GetMyReviewsData, undefined>;
  operationName: string;
}
export const getMyReviewsRef: GetMyReviewsRef;

export function getMyReviews(): QueryPromise<GetMyReviewsData, undefined>;
export function getMyReviews(dc: DataConnect): QueryPromise<GetMyReviewsData, undefined>;

