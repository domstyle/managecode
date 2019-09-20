import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'codeSearch'
})
export class CodeSearchPipe implements PipeTransform {

  // transform(value: any, ...args: any[]): any {
  //   return null;
  // }

  transform(items: any[], filter: string): any {
    if (!items || !filter) {
      return items;
    }
    // filter items array, items which match and return true will be
    // kept, false will be filtered out
    return items.filter(item => item.code_id.indexOf(filter) === 0);
  }
}
