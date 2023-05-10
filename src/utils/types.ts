export type TForm = {
    [x: string]: {
        value: string;
        error: string;
    };
};

export type TRow = {
    onDownload: (code: string) => void;
    onDelete: (code: string) => void;
    item: {
        name: string;
        code: string;
        address: string;
    };
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