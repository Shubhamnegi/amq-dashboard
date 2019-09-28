export interface JolokiaInterface {
    request: Request;
    value: {};
    timestamp: number;
    status: number;
}

interface Request {
    mbean: string;
    type: string;
}
export interface QueueDetails {
    CursorMemoryUsage: number;
    DLQ: boolean;
    InFlightCount: number;
    MemoryUsagePortion: number;
    Name: string;
    QueueSize: number;
}
