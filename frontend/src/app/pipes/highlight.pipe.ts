import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'highlight'
})
export class HighlightPipe implements PipeTransform {

  transform(value: string, highlight_term: string): unknown {
    if(!highlight_term) return value;

    //The g flag makes the regular expression search for all occurrences.
    //The i flag makes it case-insensitive
    const re = new RegExp(`(${highlight_term})`, 'gi');

    //replace all matching instances with html to make them bold. 
    //$1 will replace all the first group instances. we only have one group so all the instances in this case.
    return value.replace(re, '<strong>$1</strong>')
  }

}
