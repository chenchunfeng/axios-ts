import { ResolveFn, RejectFn, Interceptor } from '../src/types/index';


export default class InterceptorManager<T> {
    private interceptors: Array<Interceptor<T> | null>
    constructor() {
        this.interceptors = []
    }

    use(resolved: ResolveFn<T>, rejected: RejectFn): number {
        this.interceptors.push({
            resolved,
            rejected
        })
        return this.interceptors.length - 1;
    }

    eject(index: number): void {
        if (this.interceptors[index]) {
            this.interceptors[index] = null;
        }
    }

    forEach(fn: (interceptor: Interceptor<T>) => void): void {
        this.interceptors.forEach(interceptor => {
            if (interceptor !== null) {
                fn(interceptor)
            }
        })
    }
}