export type Question = {
    id: string | null;
    author: string | null;
    timestamp: number;
    optionOne: {
        votes: Array<string>
        text: string;
    },
    optionTwo: {
        votes: Array<string>
        text: string;
    }
}