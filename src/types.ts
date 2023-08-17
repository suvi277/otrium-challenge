export type CategoryType = {
    id: string;
    count: number;
    parent: string;
    name: string;
    children?: CategoryType[];
};

export type CategoryIdName = { id: string; name: string };