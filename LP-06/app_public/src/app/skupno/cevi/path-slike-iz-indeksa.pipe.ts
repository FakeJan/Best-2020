import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pathSlikeIzIndeksa'
})
export class PathSlikeIzIndeksaPipe implements PipeTransform {

  transform(index: number): string {
    var baseName = "profileAvatar";
    var path = `assets/images/profileAvatars/avatarOptions/${baseName}${index}.png`;
    return path;
  }

}
