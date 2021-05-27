import { keymap } from 'prosemirror-keymap';
import { history } from 'prosemirror-history';
import { baseKeymap } from 'prosemirror-commands';
import { Plugin } from 'prosemirror-state';
import { dropCursor } from 'prosemirror-dropcursor';
import { gapCursor } from 'prosemirror-gapcursor';
import { menuBar } from 'prosemirror-menu';

import { buildMenuItems } from './menu';
import { buildKeymap } from './keymap';
import { buildInputRules } from './inputrules';
import Placeholder from './Placeholder';

export { buildMenuItems, buildKeymap, buildInputRules };

export function humanWriterSetup(options) {
  let plugins = [
    ...(options.plugins || []),
    buildInputRules(options.schema),
    keymap(buildKeymap(options.schema, options.mapKeys)),
    keymap(baseKeymap),
    dropCursor(),
    gapCursor(),
    Placeholder(options.placeholder),
  ];
  if (options.menuBar !== false)
    plugins.push(
      menuBar({
        floating: options.floatingMenu !== false,
        content: options.menuContent || buildMenuItems(options.schema).fullMenu,
      })
    );
  if (options.history !== false) plugins.push(history());

  return plugins.concat(
    new Plugin({
      props: {
        attributes: { class: 'ProseMirror-human-style' },
      },
    })
  );
}
