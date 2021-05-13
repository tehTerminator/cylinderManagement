import { BehaviorSubject, Observable } from 'rxjs';
import { BasicItem } from './collection';

export abstract class BaseService {
    protected data = new BehaviorSubject<BasicItem[]>([]);
    protected nextUpdate = 0;
    private initialized = false;

    protected abstract fetch(): void;
    public abstract create(data: BasicItem): Observable<BasicItem>;
    public abstract update(data: BasicItem): Observable<BasicItem>;
    public abstract delete(id: number): Observable<any>;

    constructor(
        private ptableName: string,
        protected updateFrequency: number) { }

    get tableName(): string {
        return this.ptableName;
    }

    public init(forced = false): void {
        const currentDate = (new Date()).getTime();
        if (!forced) {
          if (this.nextUpdate > currentDate) {
            return;
          }
        }

        if (this.initialized) {
            return; // Prevents Multiple Init Calls
        }

        this.initialized = true;
        this.fetch();
    }

    protected store(data: BasicItem[]): void {
        this.data.next(data);
        this.nextUpdate = (new Date()).getTime() + this.updateFrequency;
    }

    getElementById(id: number): BasicItem {
        const list = this.data.value;
        if (list.length > 0) {
            const result = list.find(x => {
                if (x.hasOwnProperty('id')) {
                    return x.id === id;
                }
                throw new Error('ID field Not Found in List');
            });
            if (!!result) {
                return result;
            }
        }
        throw new Error('Item Not Found');
    }

    get(index: number): BasicItem {
        return { ...this.data.value[index] };
    }

    getAsList(): BasicItem[] {
        return [...this.data.value];
    }

    getAsObservable(): Observable<BasicItem[]> {
        return this.data;
    }

    protected deleteItem(index: number): void {
        const list = this.data.value;
        list.splice(index, 1);
        this.data.next(list);
        this.updateTimeStamp();
    }

    protected insert(item: BasicItem): void {
        this.data.next([...this.data.value, item]);
        this.updateTimeStamp();
    }

    protected updateItem(item: BasicItem): void {
        if (!item.hasOwnProperty('id')) {
            throw new Error(`Unique Field Does Not Exist in Provided Item`);
        }
        const list = this.data.value;
        const indexOfItemToBeReplaced = list.findIndex(x => {
            if (x.hasOwnProperty('id')) {
                return x.id === item.id;
            }
            throw new Error('No Unique Field in List');
        });
        list.splice(indexOfItemToBeReplaced, 1, item);
        this.data.next(list);
        this.updateTimeStamp();
    }

    private updateTimeStamp(): void {
        this.nextUpdate = (new Date()).getTime() + this.updateFrequency;
    }
}