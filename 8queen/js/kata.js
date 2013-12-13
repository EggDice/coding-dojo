'use strict';

function validate(chessTable) {
  if (!chessTable.length) {
    throw new Error('empty table');
  }
  return true;
}
