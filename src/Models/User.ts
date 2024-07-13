export type User = {
    id: string,
    firstName: string,
    lastName: string,
    email: string
}

export interface LoginUserPayload {
    email: string,
    password: string
}

export interface RegisterUserPayload {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    
}

export interface FetchUserPayload{
    userId:string,
    property:'loggedInUser' | 'profileUser'
}

export interface CoursePayLoad {
    title: string;
    description: string;
    Instructor: string | undefined;
    Image?: string;
  }