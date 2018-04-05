import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
    name: 'countdown',
    pure: false
})

export class CountdownPipe implements PipeTransform {
  transform(text: string, args: number) {
    let maxLength = args || 10
    let length = text.length;
    return (maxLength - length);
  }
}