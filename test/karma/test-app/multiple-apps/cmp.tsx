import { Component, Prop, State } from '../../../../dist/index';

@Component({
  tag: 'multiple-apps-cmp',
  styles: `
    :host {
      display: block;
      background: black;
      color: white;
      padding: 20px;
    }
    .sibling-has-loaded {
      background: limegreen;
    }
  `,
  scoped: true
})
export class MultipleAppsCmp {

  @Prop({ context: 'document' }) document: Document;
  @State() siblingAppHasLoaded = false;

  componentWillLoad() {
    const siblingRoot = this.document.querySelector('sibling-root') as any;

    siblingRoot.componentOnReady().then(() => {
      this.siblingAppHasLoaded = true;
    });
  }

  render() {
    return (
      <main>
        <section>
          main inner dom
        </section>
        {this.siblingAppHasLoaded ? (<article class="sibling-has-loaded">siblingAppHasLoaded</article>) : null}
      </main>
    );
  }

}
