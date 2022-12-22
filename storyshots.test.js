import path from 'path';
import initStoryshots, { multiSnapshotWithOptions, Stories2SnapsConverter } from '@storybook/addon-storyshots';

class AnotherStories2SnapsConverter extends Stories2SnapsConverter {
  getSnapshotFileName(context) {
    const { fileName, kind, name } = context;
    console.log(fileName, kind, name)
    const { dir } = path.parse(fileName);
    const uniqueName = `${kind.toLowerCase().replace(/ /g, '-')}-${name.toLowerCase().replace(/ /g, '_')}`;
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

    const [fileName] = name.split('@');

    return storiesExtensions.map((ext) =>
      path.format({
        dir: path.dirname(dir),
        name: fileName,
        ext,
      })
    );
  }
}
console.log(__dirname)
initStoryshots({
  test: multiSnapshotWithOptions(),
  stories2snapsConverter: new AnotherStories2SnapsConverter({
    snapshotExtension: '.snapshot'
  })
});

