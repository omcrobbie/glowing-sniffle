import path from "path";
import initStoryshots, {
  multiSnapshotWithOptions,
  Stories2SnapsConverter,
} from "@storybook/addon-storyshots";
import { ComponentFixture, TestBed } from "@angular/core/testing";

class AnotherStories2SnapsConverter extends Stories2SnapsConverter {
  getSnapshotFileName(context) {
    const { fileName, kind, name } = context;
    console.log(fileName, kind, name);
    const { dir } = path.parse(fileName);
    const uniqueName = `${kind.toLowerCase().replace(/ /g, "-")}-${name
      .toLowerCase()
      .replace(/ /g, "_")}`;
    const { snapshotsDirName, snapshotExtension } = this.options;

    return path.format({
      dir: path.join(dir, snapshotsDirName),
      name: uniqueName,
      ext: snapshotExtension,
    });
  }

  getPossibleStoriesFiles(storyshotFile) {
    const { dir, name } = path.parse(storyshotFile);
    const { storiesExtensions } = this.options;

    const [fileName] = name.split("@");

    return storiesExtensions.map((ext) =>
      path.format({
        dir: path.dirname(dir),
        name: fileName,
        ext,
      })
    );
  }
}
console.log(__dirname);
initStoryshots({
  // asyncJest: true,
  // test: async (props) => {
  //   console.log(props.story);
  //   // props.render();

  //   // setTimeout(() => {
  //   //   props.done();
  //   // }, 100);
  //   // const { moduleMetadata } = story.storyFn();
  //   // await TestBed.configureTestingModule(moduleMetadata).compileComponents();
  //   // story.render();
  //   // fixture.detectChanges();
  //   await props.renderTree(props.story, props.context, props.options);
  //   // console.log(t);
  //   setTimeout(() => {
  //     expect(true);
  //     props.done();
  //   }, 100);
  // },
  test: multiSnapshotWithOptions(),
  stories2snapsConverter: new AnotherStories2SnapsConverter({
    snapshotExtension: ".snapshot",
  }),
});
