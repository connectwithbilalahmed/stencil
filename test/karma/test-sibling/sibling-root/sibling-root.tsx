import { Component } from '../../../../dist/index';

@Component({
  tag: 'sibling-root'
})
export class SiblingRoot {

  render() {
    return (
      <div>
        Sibling root
      </div>
    );
  }
}
