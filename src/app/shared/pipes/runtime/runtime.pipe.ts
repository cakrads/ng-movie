import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'runtimeFormat',
})
export class RuntimePipe implements PipeTransform {
  transform(minutes: number): string {
    if (!minutes || minutes <= 0) return '0m';

    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;

    return `${hours > 0 ? hours + 'h ' : ''}${mins}m`.trim();
  }
}
