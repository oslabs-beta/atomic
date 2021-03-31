const acorn = require('acorn');
const jsx = require('acorn-jsx');

const JSXParser = acorn.Parser.extend(jsx());

const elementType = `function Squares(_ref) {
  var _this = this;
  var i = _ref.i;

  // useAtomDevtools(selectSquareAtom, "selectSquareAtom");
  // const [squares, selectSquare] = useAtom(selectSquareAtom);
  var _useDebugAtom = useDebugAtom(resetSquaresAtom, "resetSquaresAtom"),
      _useDebugAtom2 = Object(_home_thiesl137_toy_apps_jotai_tic_tac_toe_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__["default"])(_useDebugAtom, 2),
      reset = _useDebugAtom2[1];

  var _useDebugAtom3 = useDebugAtom(selectSquareAtom, "selectSquareAtom"),
      _useDebugAtom4 = Object(_home_thiesl137_toy_apps_jotai_tic_tac_toe_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__["default"])(_useDebugAtom3, 2),
      squares = _useDebugAtom4[0],
      selectSquare = _useDebugAtom4[1];

  var _useDebugAtom5 = useDebugAtom(winnerAtom, "winnerAtom"),
      _useDebugAtom6 = Object(_home_thiesl137_toy_apps_jotai_tic_tac_toe_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__["default"])(_useDebugAtom5, 2),
      setGameWinner = _useDebugAtom6[1];

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null, squares.map(function (el, i) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("button", {
      key: i,
      className: "square ".concat(el),
      onClick: function onClick() {
        return selectSquare(i);
      },
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 84,
        columnNumber: 9
      }
    }, el);
  }));
}`;

let ast;

try {
  ast = JSXParser.parse(elementType);
} catch (e) {
  ast = 'unknown';
}

`Since Acorn 8.0.0, options.ecmaVersion is required.
Defaulting to 2020, but this will stop working in the future.
Node {
  type: 'Program',
  start: 0,
  end: 1657,
  body: [
    Node {
      type: 'FunctionDeclaration',
      start: 0,
      end: 1657,
      id: [Node],
      expression: false,
      generator: false,
      async: false,
      params: [Array],
      body: [Node]
    }
  ],
  sourceType: 'script'
}
Hint: hit control+c anytime to enter REPL.
 ast
Node {
  type: 'Program',
  start: 0,
  end: 1657,
  body: [
    Node {
      type: 'FunctionDeclaration',
      start: 0,
      end: 1657,
      id: [Node],
      expression: false,
      generator: false,
      async: false,
      params: [Array],
      body: [Node]
    }
  ],
  sourceType: 'script'
}
 ast.body
[
  Node {
    type: 'FunctionDeclaration',
    start: 0,
    end: 1657,
    id: Node { type: 'Identifier', start: 9, end: 16, name: 'Squares' },
    expression: false,
    generator: false,
    async: false,
    params: [ [Node] ],
    body: Node {
      type: 'BlockStatement',
      start: 23,
      end: 1657,
      body: [Array]
    }
  }
]
 ast.body.bodt
undefined
 ast.body.body
undefined
 ast.body[0].body
Node {
  type: 'BlockStatement',
  start: 23,
  end: 1657,
  body: [
    Node {
      type: 'VariableDeclaration',
      start: 27,
      end: 44,
      declarations: [Array],
      kind: 'var'
    },
    Node {
      type: 'VariableDeclaration',
      start: 47,
      end: 62,
      declarations: [Array],
      kind: 'var'
    },
    Node {
      type: 'VariableDeclaration',
      start: 190,
      end: 480,
      declarations: [Array],
      kind: 'var'
    },
    Node {
      type: 'VariableDeclaration',
      start: 484,
      end: 818,
      declarations: [Array],
      kind: 'var'
    },
    Node {
      type: 'VariableDeclaration',
      start: 822,
      end: 1110,
      declarations: [Array],
      kind: 'var'
    },
    Node {
      type: 'ReturnStatement',
      start: 1114,
      end: 1655,
      argument: [Node]
    }
  ]
}
 ast.body[0].body.body[2].delclarations
undefined
 ast.body[0].body.body
[
  Node {
    type: 'VariableDeclaration',
    start: 27,
    end: 44,
    declarations: [ [Node] ],
    kind: 'var'
  },
  Node {
    type: 'VariableDeclaration',
    start: 47,
    end: 62,
    declarations: [ [Node] ],
    kind: 'var'
  },
  Node {
    type: 'VariableDeclaration',
    start: 190,
    end: 480,
    declarations: [ [Node], [Node], [Node] ],
    kind: 'var'
  },
  Node {
    type: 'VariableDeclaration',
    start: 484,
    end: 818,
    declarations: [ [Node], [Node], [Node], [Node] ],
    kind: 'var'
  },
  Node {
    type: 'VariableDeclaration',
    start: 822,
    end: 1110,
    declarations: [ [Node], [Node], [Node] ],
    kind: 'var'
  },
  Node {
    type: 'ReturnStatement',
    start: 1114,
    end: 1655,
    argument: Node {
      type: 'CallExpression',
      start: 1134,
      end: 1654,
      callee: [Node],
      arguments: [Array],
      optional: false
    }
  }
]
 ast.body[0].body.body[2]
Node {
  type: 'VariableDeclaration',
  start: 190,
  end: 480,
  declarations: [
    Node {
      type: 'VariableDeclarator',
      start: 194,
      end: 260,
      id: [Node],
      init: [Node]
    },
    Node {
      type: 'VariableDeclarator',
      start: 268,
      end: 446,
      id: [Node],
      init: [Node]
    },
    Node {
      type: 'VariableDeclarator',
      start: 454,
      end: 479,
      id: [Node],
      init: [Node]
    }
  ],
  kind: 'var'
}
 ast.body[0].body.body[2].declarations
[
  Node {
    type: 'VariableDeclarator',
    start: 194,
    end: 260,
    id: Node {
      type: 'Identifier',
      start: 194,
      end: 207,
      name: '_useDebugAtom'
    },
    init: Node {
      type: 'CallExpression',
      start: 210,
      end: 260,
      callee: [Node],
      arguments: [Array],
      optional: false
    }
  },
  Node {
    type: 'VariableDeclarator',
    start: 268,
    end: 446,
    id: Node {
      type: 'Identifier',
      start: 268,
      end: 282,
      name: '_useDebugAtom2'
    },
    init: Node {
      type: 'CallExpression',
      start: 285,
      end: 446,
      callee: [Node],
      arguments: [Array],
      optional: false
    }
  },
  Node {
    type: 'VariableDeclarator',
    start: 454,
    end: 479,
    id: Node { type: 'Identifier', start: 454, end: 459, name: 'reset' },
    init: Node {
      type: 'MemberExpression',
      start: 462,
      end: 479,
      object: [Node],
      property: [Node],
      computed: true,
      optional: false
    }
  }
]
 ast.body[0].body.body[2].declarations[0]
Node {
  type: 'VariableDeclarator',
  start: 194,
  end: 260,
  id: Node {
    type: 'Identifier',
    start: 194,
    end: 207,
    name: '_useDebugAtom'
  },
  init: Node {
    type: 'CallExpression',
    start: 210,
    end: 260,
    callee: Node {
      type: 'Identifier',
      start: 210,
      end: 222,
      name: 'useDebugAtom'
    },
    arguments: [ [Node], [Node] ],
    optional: false
  }
}
 ast.body[0].body.body[2].declarations[0].init
Node {
  type: 'CallExpression',
  start: 210,
  end: 260,
  callee: Node {
    type: 'Identifier',
    start: 210,
    end: 222,
    name: 'useDebugAtom'
  },
  arguments: [
    Node {
      type: 'Identifier',
      start: 223,
      end: 239,
      name: 'resetSquaresAtom'
    },
    Node {
      type: 'Literal',
      start: 241,
      end: 259,
      value: 'resetSquaresAtom',
      raw: '"resetSquaresAtom"'
    }
  ],
  optional: false
}
 `;
