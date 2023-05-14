export type TForm = {
    [x: string]: {
        value: string;
        error: string;
    };
};

export type TRow = {
    onDownload: (code: string) => void;
    onDelete: (code: string) => void;
    item: TItem;
};

export type Tcol = {
    children: React.ReactNode;
};

export type TTable = {
    onDownload: (code: string) => void;
    onDelete: (code: string) => void;
    data: {
        name: string;
        code: string;
        address: string;
    }[];
};

export type TItem = {
    name: string;
    code: string;
    address: string;
    filename?: string;
    lat?: string;
    lng?: string;
    state?: string;
    city?: string;
    zip?: string;
    country?: string;
    distance?: number;
};