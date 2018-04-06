import { Component, State } from '../../../../dist/index';

@Component({
  tag: 'cmp-a'
})
export class CmpA {

  @State() showContent = false;

  testClick() {
    this.showContent = !this.showContent;
  }

  render() {
    return (
      <div>
        <button onClick={this.testClick.bind(this)} class='test'>
          Test
        </button>
        <div class='results'>
          {this.showContent ? <div>Content</div> : null}
        </div>
      </div>
    );
  }

}
