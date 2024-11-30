import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'million',
  standalone: true
})
export class MillionsPipe implements PipeTransform {
  transform(amount: string): string {
    return `$${amount} million`;
  }
}
