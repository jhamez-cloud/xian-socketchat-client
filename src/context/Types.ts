export interface user {
    id?: string;
    room?: string;
    selected?: boolean;
    messages?: { id: string; message: string; room?: string }[];
    username: string;
    chatPartner: string;
}
