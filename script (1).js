//object(or dictionary) with the square positions and their respect coordinates
const spaceToCoordinate = {
    'A1': '0,0',
    'A2': '0,1',
    'A3': '0,2',
    'A4': '0,3',
    'A5': '0,4',
    'A6': '0,5',
    'A7': '0,6',
    'A8': '0,7',
    'B1': '1,0',
    'B2': '1,1',
    'B3': '1,2',
    'B4': '1,3',
    'B5': '1,4',
    'B6': '1,5',
    'B7': '1,6',
    'B8': '1,7',
    'C1': '2,0',
    'C2': '2,1',
    'C3': '2,2',
    'C4': '2,3',
    'C5': '2,4',
    'C6': '2,5',
    'C7': '2,6',
    'C8': '2,7',
    'D1': '3,0',
    'D2': '3,1',
    'D3': '3,2',
    'D4': '3,3',
    'D5': '3,4',
    'D6': '3,5',
    'D7': '3,6',
    'D8': '3,7',
    'E1': '4,0',
    'E2': '4,1',
    'E3': '4,2',
    'E4': '4,3',
    'E5': '4,4',
    'E6': '4,5',
    'E7': '4,6',
    'E8': '4,7',
    'F1': '5,0',
    'F2': '5,1',
    'F3': '5,2',
    'F4': '5,3',
    'F5': '5,4',
    'F6': '5,5',
    'F7': '5,6',
    'F8': '5,7',
    'G1': '6,0',
    'G2': '6,1',
    'G3': '6,2',
    'G4': '6,3',
    'G5': '6,4',
    'G6': '6,5',
    'G7': '6,6',
    'G8': '6,7',
    'H1': '7,0',
    'H2': '7,1',
    'H3': '7,2',
    'H4': '7,3',
    'H5': '7,4',
    'H6': '7,5',
    'H7': '7,6',
    'H8': '7,7',
};

let turn = 'white';
//converts the location fo a space to coordinate form
const convertSpaceToCoordinate = (space, obj) => obj[space];
//converts the coordinate of a space to its location
const convertCoordinateToSpace = (coordinate, obj) => Object.keys(obj).find(key => obj[key] === coordinate);

const movePiece = (event) => {
    if(turn === 'white' && event.target.classList.contains('whitePiece')) {
        let change = false;
        if(event.target.classList.contains('pawn')) {
            const pawn = event.target;
            let currentPos = pawn.classList[0];
            let currentCoordinate = convertSpaceToCoordinate(currentPos, spaceToCoordinate);
            let currentRow = parseInt(currentCoordinate[2]);
            let currentCol = parseInt(currentCoordinate[0]);
            let possibleMoves = [];
            let killMoves = [];
            let chosen = false;
            if(currentRow === 1){
                possibleMoves.push(currentCoordinate[0] + currentCoordinate[1] + '2');
                possibleMoves.push(currentCoordinate[0] + currentCoordinate[1] + '3');
            } else {
                possibleMoves.push(currentCoordinate[0] + currentCoordinate[1] + (currentRow + 1).toString())
            }
            possibleMoves.forEach(move => possibleMoves[possibleMoves.indexOf(move)] = convertCoordinateToSpace(move, spaceToCoordinate));
            possibleMoves.forEach(move => {
                spaces.forEach(space => {
                    if(space.id === move) {
                        possibleMoves[possibleMoves.indexOf(move)] = space;
                    }
                })
            })
            killMoves.push((currentCol - 1).toString() + ',' + (currentRow + 1).toString());
            killMoves.push((currentCol + 1).toString() + ',' + (currentRow + 1).toString());
            killMoves.forEach(move => killMoves[killMoves.indexOf(move)] = convertCoordinateToSpace(move, spaceToCoordinate));
            killMoves.forEach(move => {
                spaces.forEach(space => {
                    if(space.id === move) {
                        killMoves[killMoves.indexOf(move)] = space;
                    }
                })
            })

            if(possibleMoves.length > 1) {
                if(possibleMoves[0].hasChildNodes()) {
                    possibleMoves.splice(0, 2)
                }
            }
            killMoves.forEach(move => {
                if(move && move.hasChildNodes() && move.firstChild.classList.contains('blackPiece')) {
                    move.classList.add('kill');
                    move.firstChild.removeEventListener('click', movePiece);
                    move.addEventListener('click', function killPiece(event) {
                        if(!chosen){
                            move.removeChild(move.firstChild);
                            move.appendChild(pawn);
                            pawn.classList.replace(currentPos, move.id);
                            possibleMoves.forEach(pm => pm.classList.remove('possible'))
                            killMoves.forEach(km => {
                                if(km && km.classList.contains('kill')) {
                                    km.classList.remove('kill');
                                    if(km.hasChildNodes()){
                                        km.firstChild.addEventListener('click', movePiece)
                                    }
                                }
                            })
                            chosen = true;
                        }
                    }, {once: true})
                    change = true
                }
            })

            possibleMoves.forEach(move => {
                if(move && !move.hasChildNodes()) {
                    move.classList.add('possible');
                    move.addEventListener('click', function change(event) {
                        if(!chosen){
                            event.target.appendChild(pawn);
                            pawn.classList.replace(currentPos, move.id);
                            possibleMoves.forEach(pm => {
                                pm.classList.remove('possible');
                            })
                            killMoves.forEach(km => {
                                if(km && km.classList.contains('kill')) {
                                    km.classList.remove('kill');
                                    if(km.hasChildNodes()) {
                                        km.firstChild.addEventListener('click', movePiece)
                                    }
                                }
                            })
                            chosen = true;
                        }
                    }, {once: true});
                    change = true
                }
            })
        } else if(event.target.classList.contains('rook')) {
            const rook = event.target;
            let currentPos = rook.classList[0];
            let currentCoordinate = convertSpaceToCoordinate(currentPos, spaceToCoordinate);
            let currentRow = parseInt(currentCoordinate[2]);
            let currentCol = parseInt(currentCoordinate[0]);
            let possibleMovesUp = [];
            let possibleMovesDown = [];
            let possibleMovesLeft = [];
            let possibleMovesRight = [];
            let killMoves = [];
            let chosen = false;
            for (let i = 1; i < 8; i++) {
                possibleMovesUp.push(currentCoordinate[0] + currentCoordinate[1] + (currentRow + i).toString());
                possibleMovesDown.push(currentCoordinate[0] + currentCoordinate[1] + (currentRow - i).toString());
                possibleMovesRight.push((currentCol + i).toString() + currentCoordinate[1] + currentCoordinate[2]);
                possibleMovesLeft.push((currentCol - i).toString() + currentCoordinate[1] + currentCoordinate[2]);
            }
            possibleMovesUp.forEach(move => {
                if(convertCoordinateToSpace(move, spaceToCoordinate) !== undefined) {
                    possibleMovesUp[possibleMovesUp.indexOf(move)] = convertCoordinateToSpace(move, spaceToCoordinate);
                } else {
                    possibleMovesUp.splice(possibleMovesUp.indexOf(move), possibleMovesUp.length - possibleMovesUp.indexOf(move));
                }
            })
            possibleMovesDown.forEach(move => {
                if(convertCoordinateToSpace(move, spaceToCoordinate) !== undefined) {
                    possibleMovesDown[possibleMovesDown.indexOf(move)] = convertCoordinateToSpace(move, spaceToCoordinate);
                } else {
                    possibleMovesDown.splice(possibleMovesDown.indexOf(move), possibleMovesDown.length - (possibleMovesDown.indexOf(move)))
                }
            })
            possibleMovesRight.forEach(move => {
                if(convertCoordinateToSpace(move, spaceToCoordinate) !== undefined) {
                    possibleMovesRight[possibleMovesRight.indexOf(move)] = convertCoordinateToSpace(move, spaceToCoordinate);
                } else {
                    possibleMovesRight.splice(possibleMovesRight.indexOf(move), possibleMovesRight.length - possibleMovesRight.indexOf(move));
                }
            })
            possibleMovesLeft.forEach(move => {
                if(convertCoordinateToSpace(move, spaceToCoordinate) !== undefined) {
                    possibleMovesLeft[possibleMovesLeft.indexOf(move)] = convertCoordinateToSpace(move, spaceToCoordinate);
                } else {
                    possibleMovesLeft.splice(possibleMovesLeft.indexOf(move), possibleMovesLeft.length - possibleMovesLeft.indexOf(move));
                }
            })

            if(possibleMovesUp.length > 0) {
                possibleMovesUp.forEach(move => {
                    spaces.forEach(space => {
                        if(space.id === move) {
                            possibleMovesUp[possibleMovesUp.indexOf(move)] = space;
                        }
                    })
                })
            }
            if(possibleMovesDown.length > 0) {
                possibleMovesDown.forEach(move => {
                    spaces.forEach(space => {
                        if(space.id === move) {
                            possibleMovesDown[possibleMovesDown.indexOf(move)] = space;
                        }
                    })
                })
            }
            if(possibleMovesLeft.length > 0) {
                possibleMovesLeft.forEach(move => {
                    spaces.forEach(space => {
                        if(space.id === move) {
                            possibleMovesLeft[possibleMovesLeft.indexOf(move)] = space;
                        }
                    })
                })
            }
            if(possibleMovesRight.length > 0) {
                possibleMovesRight.forEach(move => {
                    spaces.forEach(space => {
                        if(space.id === move) {
                            possibleMovesRight[possibleMovesRight.indexOf(move)] = space;
                        }
                    })
                })
            }
            if(possibleMovesUp.length > 0) {
                possibleMovesUp.forEach(move => {
                    if(move && move.hasChildNodes() && move.firstChild.classList.contains('whitePiece')) {
                        possibleMovesUp.splice(possibleMovesUp.indexOf(move), possibleMovesUp.length - possibleMovesUp.indexOf(move));
                    } else if(move && move.hasChildNodes() && move.firstChild.classList.contains('blackPiece')) {
                        killMoves.push(move)
                        possibleMovesUp.splice(possibleMovesUp.indexOf(move), possibleMovesUp.length - (possibleMovesUp.indexOf(move)));
                    }
                })
            }
            if(possibleMovesDown.length > 0) {
                possibleMovesDown.forEach(move => {
                    if(move && move.hasChildNodes() && move.firstChild.classList.contains('whitePiece')) {
                        possibleMovesDown.splice(possibleMovesDown.indexOf(move), possibleMovesDown.length - possibleMovesUp.indexOf(move));
                    } else if(move && move.hasChildNodes() && move.firstChild.classList.contains('blackPiece')) {
                        killMoves.push(move);
                        possibleMovesDown.splice(possibleMovesDown.indexOf(move), possibleMovesDown.length - possibleMovesDown.indexOf(move))
                    }
                })
            }
            if(possibleMovesLeft.length > 0) {
                possibleMovesLeft.forEach(move => {
                    if(move && move.hasChildNodes() && move.firstChild.classList.contains('whitePiece')) {
                        possibleMovesLeft.splice(possibleMovesLeft.indexOf(move), possibleMovesLeft.length - possibleMovesLeft.indexOf(move));
                    } else if(move && move.hasChildNodes() && move.firstChild.classList.contains('blackPiece')) {
                        killMoves.push(move);
                        possibleMovesLeft.splice(possibleMovesLeft.indexOf(move), possibleMovesLeft.length - possibleMovesLeft.indexOf(move));
                    }
                })
            }
            if(possibleMovesRight.length > 0) {
                possibleMovesRight.forEach(move => {
                    if(move && move.hasChildNodes() && move.firstChild.classList.contains('whitePiece')) {
                        possibleMovesRight.splice(possibleMovesRight.indexOf(move), possibleMovesRight.length - possibleMovesRight.indexOf(move));
                    } else if(move && move.hasChildNodes() && move.firstChild.classList.contains('blackPiece')){
                        killMoves.push(move);
                        possibleMovesRight.splice(possibleMovesRight.indexOf(move), possibleMovesRight.length - possibleMovesRight.indexOf(move));
                    }
                })
            }
            console.log(possibleMovesDown)
            console.log(possibleMovesLeft)
            console.log(possibleMovesRight)
            console.log(possibleMovesUp)
            console.log(killMoves)
            if(possibleMovesUp.length > 0) {
                possibleMovesUp.forEach(move => {
                    move.classList.add('possible');
                    move.addEventListener('click', function change(event) {
                        if(!chosen){
                            event.target.appendChild(rook);
                            rook.classList.replace(currentPos, move.id);
                            possibleMovesUp.forEach(pmU => {
                                pmU.classList.remove('possible')
                            })
                            possibleMovesDown.forEach(pmD => {
                                pmD.classList.remove('possible')
                            })
                            possibleMovesRight.forEach(pmR => {
                                pmR.classList.remove('possible')
                            })
                            possibleMovesLeft.forEach(pmL => {
                                pmL.classList.remove('possible')
                            })
                            killMoves.forEach(km => {
                                if(km && km.classList.contains('kill')) {
                                    km.classList.remove('kill');
                                    if(km.hasChildNodes()){
                                        km.firstChild.addEventListener('click', movePiece)
                                    }
                                }
                            })
                            chosen = true
                        }
                    }, {chosen: true})
                })
                change = true
            }
            if(possibleMovesDown.length > 0) {
                possibleMovesDown.forEach(move => {
                    move.classList.add('possible');
                    move.addEventListener('click', function change(event) {
                        if(!chosen){
                            event.target.appendChild(rook);
                            rook.classList.replace(currentPos, move.id);
                            possibleMovesUp.forEach(pmU => {
                                pmU.classList.remove('possible')
                            })
                            possibleMovesDown.forEach(pmD => {
                                pmD.classList.remove('possible')
                            })
                            possibleMovesRight.forEach(pmR => {
                                pmR.classList.remove('possible')
                            })
                            possibleMovesLeft.forEach(pmL => {
                                pmL.classList.remove('possible')
                            })
                            killMoves.forEach(km => {
                                if(km && km.classList.contains('kill')) {
                                    km.classList.remove('kill');
                                    if(km.hasChildNodes()){
                                        km.firstChild.addEventListener('click', movePiece)
                                    }
                                }
                            })
                            chosen = true
                        }
                    }, {chosen: true})
                })
                change = true
            }
            if(possibleMovesLeft.length > 0) {
                possibleMovesLeft.forEach(move => {
                    move.classList.add('possible');
                    move.addEventListener('click', function change(event) {
                        if(!chosen){
                            event.target.appendChild(rook);
                            rook.classList.replace(currentPos, move.id);
                            possibleMovesUp.forEach(pmU => {
                                pmU.classList.remove('possible')
                            })
                            possibleMovesDown.forEach(pmD => {
                                pmD.classList.remove('possible')
                            })
                            possibleMovesRight.forEach(pmR => {
                                pmR.classList.remove('possible')
                            })
                            possibleMovesLeft.forEach(pmL => {
                                pmL.classList.remove('possible')
                            })
                            killMoves.forEach(km => {
                                if(km && km.classList.contains('kill')) {
                                    km.classList.remove('kill');
                                    if(km.hasChildNodes()){
                                        km.firstChild.addEventListener('click', movePiece)
                                    }
                                }
                            })
                            chosen = true
                        }
                    }, {chosen: true})
                })
                change = true
            }
            if(possibleMovesRight.length > 0) {
                possibleMovesRight.forEach(move => {
                    move.classList.add('possible');
                    move.addEventListener('click', function change(event) {
                        if(!chosen){
                            event.target.appendChild(rook);
                            rook.classList.replace(currentPos, move.id);
                            possibleMovesUp.forEach(pmU => {
                                pmU.classList.remove('possible')
                            })
                            possibleMovesDown.forEach(pmD => {
                                pmD.classList.remove('possible')
                            })
                            possibleMovesRight.forEach(pmR => {
                                pmR.classList.remove('possible')
                            })
                            possibleMovesLeft.forEach(pmL => {
                                pmL.classList.remove('possible')
                            })
                            killMoves.forEach(km => {
                                if(km && km.classList.contains('kill')) {
                                    km.classList.remove('kill');
                                    if(km.hasChildNodes()){
                                        km.firstChild.addEventListener('click', movePiece)
                                    }
                                }
                            })
                            chosen = true
                        }
                    }, {chosen: true})
                })
                change = true
            }
            if(killMoves.length > 0) {
                killMoves.forEach(move => {
                    move.classList.add('kill');
                    move.firstChild.removeEventListener('click', movePiece)
                    move.addEventListener('click', function killPiece(event) {
                        if(!chosen){
                            move.removeChild(move.firstChild);
                            move.appendChild(rook);
                            rook.classList.replace(currentPos, move.id);
                            possibleMovesUp.forEach(pmU => {
                                pmU.classList.remove('possible')
                            })
                            possibleMovesDown.forEach(pmD => {
                                pmD.classList.remove('possible')
                            })
                            possibleMovesRight.forEach(pmR => {
                                pmR.classList.remove('possible')
                            })
                            possibleMovesLeft.forEach(pmL => {
                                pmL.classList.remove('possible')
                            })
                            killMoves.forEach(km => {
                                if(km && km.classList.contains('kill')) {
                                    km.classList.remove('kill');
                                    if(km.hasChildNodes()){
                                        km.firstChild.addEventListener('click', movePiece)
                                    }
                                }
                            })
                            chosen = true
                        }
                    }, {once:true})
                })
                change = true
            }
        } else if(event.target.classList.contains('knight')) {
            const knight = event.target;
            let currentPos = knight.classList[0];
            let currentCoordinate = convertSpaceToCoordinate(currentPos, spaceToCoordinate)
            let currentRow = parseInt(currentCoordinate[2]);
            let currentCol = parseInt(currentCoordinate[0]);
            let possibleMoves = [];
            let killMoves = [];
            let chosen = false;
            const moves = [
                [1, 2],
                [-1, 2],
                [2, 1],
                [2, -1],
                [1, -2],
                [-1, -2],
                [-2, 1],
                [-2, -1]
            ]
            for(let i = 0; i < moves.length; i++) {
                const move = moves[i];
                let newCol = currentCol + move[0];
                let newRow = currentRow + move[1];
                if(newCol > -1 && newCol < 8 && newRow > -1 && newRow < 8) {
                    let point = (newCol).toString() + ',' + (newRow).toString();
                    point = convertCoordinateToSpace(point, spaceToCoordinate)
                    let space = document.getElementById(point)
                    if(space && !space.hasChildNodes()) {
                        possibleMoves.push(space)
                    } else if(space && space.hasChildNodes() && space.firstChild.classList.contains('blackPiece')) {
                        killMoves.push(space)
                    }

                }
            }
            if(possibleMoves.length > 0) {
                possibleMoves.forEach(move => {
                    move.classList.add('possible');
                    move.addEventListener('click', function change(event) {
                        if(!chosen){
                            knight.classList.replace(currentPos, move.id);
                            event.target.appendChild(knight);
                            possibleMoves.forEach(pm => pm.classList.remove('possible'))
                            killMoves.forEach(km => {
                                if(km && km.classList.contains('kill')) {
                                    km.classList.remove('kill');
                                    if(km.hasChildNodes()) {
                                        km.firstChild.addEventListener('click', movePiece)
                                    }
                                }
                            })
                            chosen = true
                        }
                    }, {once: true})
                })
                change = true
            }
            if(killMoves.length > 0) {
                killMoves.forEach(move => {
                    move.classList.add('kill');
                    move.firstChild.removeEventListener('click', movePiece)
                    move.addEventListener('click', function killPiece(event) {
                        if(!chosen) {
                            move.removeChild(move.firstChild);
                            move.appendChild(knight);
                            knight.classList.replace(currentPos, move.id);
                            possibleMoves.forEach(pm => pm.classList.remove('possible'))
                            killMoves.forEach(km => {
                                if(km && km.classList.contains('kill')) {
                                    km.classList.remove('kill');
                                    if(km.hasChildNodes()){
                                        km.firstChild.addEventListener('click', movePiece);
                                    }
                                }
                            })
                            chosen = true
                        }
                    }, {once:true})
                })
                change = true
            }
        } else if(event.target.classList.contains('bishop')) {
            const bishop = event.target
            let currentPos = bishop.classList[0]
            let currentCoordinate = convertSpaceToCoordinate(currentPos, spaceToCoordinate)
            let currentCol = parseInt(currentCoordinate[0])
            let currentRow = parseInt(currentCoordinate[2])
            let possibleMovesUpRight = [];
            let possibleMovesUpLeft = [];
            let possibleMovesDownRight = [];
            let possibleMovesDownLeft = [];
            let killMoves = []
            let chosen = false;
            for(let i = 1; i < 8; i++) {
                if(currentCol + i < 8 && currentRow + i < 8) {
                    let move = convertCoordinateToSpace((currentCol + i).toString() + currentCoordinate[1] + (currentRow + i).toString(), spaceToCoordinate)
                    spaces.forEach(space => {
                        if(space.id === move) {
                            possibleMovesUpRight.push(space)
                        }
                    })
                }
                if(currentCol - i > -1 && currentRow + i < 8) {
                    let move = convertCoordinateToSpace((currentCol - i).toString() + currentCoordinate[1] + (currentRow + i).toString(), spaceToCoordinate)
                    spaces.forEach(space => {
                        if(space.id === move) {
                            possibleMovesUpLeft.push(space)
                        }
                    })
                }
                if(currentCol + i < 8 && currentRow - i > -1) {
                    let move = convertCoordinateToSpace((currentCol + i).toString() + currentCoordinate[1] + (currentRow - i).toString(), spaceToCoordinate)
                    spaces.forEach(space => {
                        if(space.id === move) {
                            possibleMovesDownRight.push(space)
                        }
                    })
                }
                if(currentCol - i > -1 && currentRow - i > -1) {
                    let move = convertCoordinateToSpace((currentCol - i).toString() + currentCoordinate[1] + (currentRow - i).toString(), spaceToCoordinate)
                    spaces.forEach(space => {
                        if(space.id === move) {
                            possibleMovesDownLeft.push(space)
                        }
                    })
                }
            }
            possibleMovesUpRight.forEach(move => {
                if(move && move.hasChildNodes() && move.firstChild.classList.contains('whitePiece')) {
                    possibleMovesUpRight.splice(possibleMovesUpRight.indexOf(move), possibleMovesUpRight.length - possibleMovesUpRight.indexOf(move));
                } else if(move && move.hasChildNodes() && move.firstChild.classList.contains('blackPiece')) {
                    killMoves.push(move);
                    possibleMovesUpRight.splice(possibleMovesUpRight.indexOf(move), possibleMovesUpRight.length - possibleMovesUpRight.indexOf(move));
                }
            })
            possibleMovesUpLeft.forEach(move => {
                if(move && move.hasChildNodes() && move.firstChild.classList.contains('whitePiece')) {
                    possibleMovesUpLeft.splice(possibleMovesUpLeft.indexOf(move), possibleMovesUpLeft.length - possibleMovesUpLeft.indexOf(move));
                } else if(move && move.hasChildNodes() && move.firstChild.classList.contains('blackPiece')) {
                    killMoves.push(move);
                    possibleMovesUpLeft.splice(possibleMovesUpLeft.indexOf(move), possibleMovesUpLeft.length - possibleMovesUpLeft.indexOf(move));
                }
            })
            possibleMovesDownRight.forEach(move => {
                if(move && move.hasChildNodes() && move.firstChild.classList.contains('whitePiece')) {
                    possibleMovesDownRight.splice(possibleMovesDownRight.indexOf(move), possibleMovesDownRight.length - possibleMovesDownRight.indexOf(move));
                } else if(move && move.hasChildNodes() && move.firstChild.classList.contains('blackPiece')) {
                    killMoves.push(move);
                    possibleMovesDownRight.splice(possibleMovesDownRight.indexOf(move), possibleMovesDownRight.length - possibleMovesDownRight.indexOf(move));
                }
            })
            possibleMovesDownLeft.forEach(move => {
                if(move && move.hasChildNodes() && move.firstChild.classList.contains('whitePiece')) {
                    possibleMovesDownLeft.splice(possibleMovesDownLeft.indexOf(move), possibleMovesDownLeft.length - possibleMovesDownLeft.indexOf(move));
                } else if(move && move.hasChildNodes() && move.firstChild.classList.contains('blackPiece')) {
                    killMoves.push(move);
                    possibleMovesDownLeft.splice(possibleMovesDownLeft.indexOf(move), possibleMovesDownLeft.length - possibleMovesDownLeft.indexOf(move));
                }
            })
            if(possibleMovesUpRight.length > 0) {
                possibleMovesUpRight.forEach(move => {
                    move.classList.add('possible')
                    move.addEventListener('click', function change(event){
                        if(!chosen){
                            bishop.classList.replace(currentPos, move.id);
                            event.target.appendChild(bishop);
                            possibleMovesUpRight.forEach(pmUR => pmUR.classList.remove('possible'))
                            possibleMovesUpLeft.forEach(pmUL => pmUL.classList.remove('possible'))
                            possibleMovesDownRight.forEach(pmDR => pmDR.classList.remove('possible'))
                            possibleMovesDownLeft.forEach(pmDL => pmDL.classList.remove('possible'))
                            killMoves.forEach(km => {
                                if(km && km.classList.contains('kill')) {
                                    km.classList.remove('kill');
                                    if(km.hasChildNodes()) {
                                        km.firstChild.addEventListener('click', movePiece)
                                    }
                                }
                            })
                            chosen = true
                        }
                    }, {once:true})
                })
                change = true
            }
            if(possibleMovesUpLeft.length > 0) {
                possibleMovesUpLeft.forEach(move => {
                    move.classList.add('possible')
                    move.addEventListener('click', function change(event){
                        if(!chosen){
                            bishop.classList.replace(currentPos, move.id);
                            event.target.appendChild(bishop);
                            possibleMovesUpRight.forEach(pmUR => pmUR.classList.remove('possible'))
                            possibleMovesUpLeft.forEach(pmUL => pmUL.classList.remove('possible'))
                            possibleMovesDownRight.forEach(pmDR => pmDR.classList.remove('possible'))
                            possibleMovesDownLeft.forEach(pmDL => pmDL.classList.remove('possible'))
                            killMoves.forEach(km => {
                                if(km && km.classList.contains('kill')) {
                                    km.classList.remove('kill');
                                    if(km.hasChildNodes()) {
                                        km.firstChild.addEventListener('click', movePiece)
                                    }
                                }
                            })
                            chosen = true
                        }
                    }, {once:true})
                })
                change = true
            }
            if(possibleMovesDownRight.length > 0) {
                possibleMovesDownRight.forEach(move => {
                    move.classList.add('possible')
                    move.addEventListener('click', function change(event){
                        if(!chosen){
                            bishop.classList.replace(currentPos, move.id);
                            event.target.appendChild(bishop);
                            possibleMovesUpRight.forEach(pmUR => pmUR.classList.remove('possible'))
                            possibleMovesUpLeft.forEach(pmUL => pmUL.classList.remove('possible'))
                            possibleMovesDownRight.forEach(pmDR => pmDR.classList.remove('possible'))
                            possibleMovesDownLeft.forEach(pmDL => pmDL.classList.remove('possible'))
                            killMoves.forEach(km => {
                                if(km && km.classList.contains('kill')) {
                                    km.classList.remove('kill');
                                    if(km.hasChildNodes()) {
                                        km.firstChild.addEventListener('click', movePiece)
                                    }
                                }
                            })
                            chosen = true
                        }
                    }, {once:true})
                })
                change = true
            }
            if(possibleMovesDownLeft.length > 0) {
                possibleMovesDownLeft.forEach(move => {
                    move.classList.add('possible')
                    move.addEventListener('click', function change(event){
                        if(!chosen){
                            bishop.classList.replace(currentPos, move.id);
                            event.target.appendChild(bishop);
                            possibleMovesUpRight.forEach(pmUR => pmUR.classList.remove('possible'))
                            possibleMovesUpLeft.forEach(pmUL => pmUL.classList.remove('possible'))
                            possibleMovesDownRight.forEach(pmDR => pmDR.classList.remove('possible'))
                            possibleMovesDownLeft.forEach(pmDL => pmDL.classList.remove('possible'))
                            killMoves.forEach(km => {
                                if(km && km.classList.contains('kill')) {
                                    km.classList.remove('kill');
                                    if(km.hasChildNodes()) {
                                        km.firstChild.addEventListener('click', movePiece)
                                    }
                                }
                            })
                            chosen = true
                        }
                    }, {once:true})
                })
                change = true
            }
            if(killMoves.length > 0) {
                killMoves.forEach(move => {
                    move.classList.add('kill');
                    move.firstChild.removeEventListener('click', movePiece)
                    move.addEventListener('click', function killPiece(event) {
                        if(!chosen) {
                            move.removeChild(move.firstChild);
                            move.appendChild(bishop);
                            bishop.classList.replace(currentPos, move.id);
                            possibleMovesUpRight.forEach(pmUR => pmUR.classList.remove('possible'))
                            possibleMovesUpLeft.forEach(pmUL => pmUL.classList.remove('possible'))
                            possibleMovesDownRight.forEach(pmDR => pmDR.classList.remove('possible'))
                            possibleMovesDownLeft.forEach(pmDL => pmDL.classList.remove('possible'))
                            killMoves.forEach(km => {
                                if(km && km.classList.contains('kill')) {
                                    km.classList.remove('kill');
                                    if(km.hasChildNodes()){
                                        km.firstChild.addEventListener('click', movePiece);
                                    }
                                }
                            })
                            chosen = true
                        }
                    }, {once:true})
                })
                change = true
            }
        } else if(event.target.classList.contains('queen')) {
            const queen = event.target
            let currentPos = queen.classList[0]
            let currentCoordinate = convertSpaceToCoordinate(currentPos, spaceToCoordinate)
            let currentRow = parseInt(currentCoordinate[2])
            let currentCol = parseInt(currentCoordinate[0])
            let possibleMovesUp = [];
            let possibleMovesUpRight = [];
            let possibleMovesRight = [];
            let possibleMovesDownRight = [];
            let possibleMovesDown = [];
            let possibleMovesDownLeft = [];
            let possibleMovesLeft = [];
            let possibleMovesUpLeft = [];
            let killMoves = [];
            let chosen = false
            for(let i = 1; i < 8; i++) {
                if(currentRow + i < 8) {
                    let move = convertCoordinateToSpace((currentCol).toString() + currentCoordinate[1] + (currentRow + i).toString(), spaceToCoordinate)
                    spaces.forEach(space => {
                        if(space.id === move) {
                            possibleMovesUp.push(space)
                        }
                    })
                } else if(currentRow + i < 8 && currentCol + i < 8) {
                    let move = convertCoordinateToSpace((currentCol + i).toString() + currentCoordinate[1] + (currentRow + i).toString(), spaceToCoordinate)
                    spaces.forEach(space => {
                        if(space.id === move) {
                            possibleMovesUpRight.push(space)
                        }
                    }) 
                } else if(currentCol + i < 8) {
                    let move = convertCoordinateToSpace((currentCol + i).toString() + currentCoordinate[1] + (currentRow).toString(), spaceToCoordinate)
                    spaces.forEach(space => {
                        if(space.id === move) {
                            possibleMovesRight.push(space)
                        }
                    })
                } else if(currentCol + i < 8 && currentRow - i > -1) {
                    let move = convertCoordinateToSpace((currentCol + i).toString() + currentCoordinate[1] + (currentRow - i).toString(), spaceToCoordinate)
                    spaces.forEach(space => {
                        if(space.id === move) {
                            possibleMovesDownRight.push(space)
                        }
                    })
                } else if(currentRow - i > -1) {
                    let move = convertCoordinateToSpace((currentCol).toString() + currentCoordinate[1] + (currentRow - i).toString(), spaceToCoordinate)
                } else if(currentCol - i > -1 && currentRow - i > -1) {
                    let move = convertCoordinateToSpace((currentCol - i).toString() + currentCoordinate[1] + (currentRow - i).toString(), spaceToCoordinate)
                } else if(currentCol - i > -1) {
                    let move = convertCoordinateToSpace((currentCol - i).toString() + currentCoordinate[1] + (currentRow).toString(), spaceToCoordinate)
                } else if(currentCol - i > -1 && currentRow + i < 8) {
                }
            }
        }
        if(change) {
            turn = 'black';
        }
    } else if(turn === 'black' && event.target.classList.contains('blackPiece')) {
        let change = false
        if(event.target.classList.contains('pawn')) {
            const pawn = event.target;
            let currentPos = pawn.classList[0];
            let currentCoordinate = convertSpaceToCoordinate(currentPos, spaceToCoordinate);
            let currentRow = parseInt(currentCoordinate[2]);
            let currentCol = parseInt(currentCoordinate[0]);
            let possibleMoves = [];
            let killMoves = [];
            let chosen = false;
            if(currentRow === 6){
                possibleMoves.push(currentCoordinate[0] + currentCoordinate[1] + '5');
                possibleMoves.push(currentCoordinate[0] + currentCoordinate[1] + '4');
            } else {
                possibleMoves.push(currentCoordinate[0] + currentCoordinate[1] + (currentRow - 1).toString())
            }
            possibleMoves.forEach(move => possibleMoves[possibleMoves.indexOf(move)] = convertCoordinateToSpace(move, spaceToCoordinate));
            possibleMoves.forEach(move => {
                spaces.forEach(space => {
                    if(space.id === move) {
                        possibleMoves[possibleMoves.indexOf(move)] = space;
                    }
                })
            })

            killMoves.push((currentCol - 1).toString() + ',' + (currentRow - 1).toString());
            killMoves.push((currentCol + 1).toString() + ',' + (currentRow - 1).toString());
            killMoves.forEach(move => killMoves[killMoves.indexOf(move)] = convertCoordinateToSpace(move, spaceToCoordinate));
            killMoves.forEach(move => {
                spaces.forEach(space => {
                    if(space.id === move) {
                        killMoves[killMoves.indexOf(move)] = space;
                    }
                })
            })

            if(possibleMoves.length > 1) {
                if(possibleMoves[0].hasChildNodes()) {
                    possibleMoves.splice(0, 2)
                }
            }
            killMoves.forEach(move => {
                if(move && move.hasChildNodes() && move.firstChild.classList.contains('whitePiece')) {
                    move.classList.add('kill');
                    move.firstChild.removeEventListener('click', movePiece);
                    move.addEventListener('click', function killPiece(event) {
                        if(!chosen){
                            move.removeChild(move.firstChild);
                            move.appendChild(pawn);
                            pawn.classList.replace(currentPos, move.id);
                            possibleMoves.forEach(pm => pm.classList.remove('possible'))
                            killMoves.forEach(km => {
                                if(km && km.classList.contains('kill')) {
                                    km.classList.remove('kill');
                                    if(km.hasChildNodes()){
                                        km.firstChild.addEventListener('click', movePiece);
                                    }
                                }
                            })
                            chosen = true;
                        }
                    }, {once: true})
                    change = true
                }
            })

            possibleMoves.forEach(move => {
                if(move && !move.hasChildNodes()) {
                    move.classList.add('possible');
                    move.addEventListener('click', function change(event) {
                        if(!chosen){
                            event.target.appendChild(pawn);
                            pawn.classList.replace(currentPos, move.id);
                            possibleMoves.forEach(pm => {
                                pm.classList.remove('possible');
                            })
                            killMoves.forEach(km => {
                                if(km && km.classList.contains('kill')) {
                                    km.classList.remove('kill');
                                    if(km.hasChildNodes()) {
                                        km.firstChild.addEventListener('click', movePiece)
                                    }
                                }
                            })
                            chosen = true;
                        }
                    }, {once: true});
                    change = true
                }
            })
        } else if(event.target.classList.contains('rook')){
            const rook = event.target;
            let currentPos = rook.classList[0];
            let currentCoordinate = convertSpaceToCoordinate(currentPos, spaceToCoordinate);
            let currentRow = parseInt(currentCoordinate[2]);
            let currentCol = parseInt(currentCoordinate[0]);
            let possibleMovesUp = [];
            let possibleMovesDown = [];
            let possibleMovesLeft = [];
            let possibleMovesRight = [];
            let killMoves = [];
            let chosen = false;
            for (let i = 1; i < 8; i++) {
                possibleMovesUp.push(currentCoordinate[0] + currentCoordinate[1] + (currentRow + i).toString());
                possibleMovesDown.push(currentCoordinate[0] + currentCoordinate[1] + (currentRow - i).toString());
                possibleMovesRight.push((currentCol + i).toString() + currentCoordinate[1] + currentCoordinate[2]);
                possibleMovesLeft.push((currentCol - i).toString() + currentCoordinate[1] + currentCoordinate[2]);
            }
            possibleMovesUp.forEach(move => {
                if(convertCoordinateToSpace(move, spaceToCoordinate) !== undefined) {
                    possibleMovesUp[possibleMovesUp.indexOf(move)] = convertCoordinateToSpace(move, spaceToCoordinate);
                } else {
                    possibleMovesUp.splice(possibleMovesUp.indexOf(move), possibleMovesUp.length - possibleMovesUp.indexOf(move));
                }
            })
            possibleMovesDown.forEach(move => {
                if(convertCoordinateToSpace(move, spaceToCoordinate) !== undefined) {
                    possibleMovesDown[possibleMovesDown.indexOf(move)] = convertCoordinateToSpace(move, spaceToCoordinate);
                } else {
                    possibleMovesDown.splice(possibleMovesDown.indexOf(move), possibleMovesDown.length - (possibleMovesDown.indexOf(move)))
                }
            })
            possibleMovesRight.forEach(move => {
                if(convertCoordinateToSpace(move, spaceToCoordinate) !== undefined) {
                    possibleMovesRight[possibleMovesRight.indexOf(move)] = convertCoordinateToSpace(move, spaceToCoordinate);
                } else {
                    possibleMovesRight.splice(possibleMovesRight.indexOf(move), possibleMovesRight.length - possibleMovesRight.indexOf(move));
                }
            })
            possibleMovesLeft.forEach(move => {
                if(convertCoordinateToSpace(move, spaceToCoordinate) !== undefined) {
                    possibleMovesLeft[possibleMovesLeft.indexOf(move)] = convertCoordinateToSpace(move, spaceToCoordinate);
                } else {
                    possibleMovesLeft.splice(possibleMovesLeft.indexOf(move), possibleMovesLeft.length - possibleMovesLeft.indexOf(move));
                }
            })

            if(possibleMovesUp.length > 0) {
                possibleMovesUp.forEach(move => {
                    spaces.forEach(space => {
                        if(space.id === move) {
                            possibleMovesUp[possibleMovesUp.indexOf(move)] = space;
                        }
                    })
                })
            }
            if(possibleMovesDown.length > 0) {
                possibleMovesDown.forEach(move => {
                    spaces.forEach(space => {
                        if(space.id === move) {
                            possibleMovesDown[possibleMovesDown.indexOf(move)] = space;
                        }
                    })
                })
            }
            if(possibleMovesLeft.length > 0) {
                possibleMovesLeft.forEach(move => {
                    spaces.forEach(space => {
                        if(space.id === move) {
                            possibleMovesLeft[possibleMovesLeft.indexOf(move)] = space;
                        }
                    })
                })
            }
            if(possibleMovesRight.length > 0) {
                possibleMovesRight.forEach(move => {
                    spaces.forEach(space => {
                        if(space.id === move) {
                            possibleMovesRight[possibleMovesRight.indexOf(move)] = space;
                        }
                    })
                })
            }
            if(possibleMovesUp.length > 0) {
                possibleMovesUp.forEach(move => {
                    if(move && move.hasChildNodes() && move.firstChild.classList.contains('blackPiece')) {
                        possibleMovesUp.splice(possibleMovesUp.indexOf(move), possibleMovesUp.length - possibleMovesUp.indexOf(move));
                    } else if(move && move.hasChildNodes() && move.firstChild.classList.contains('whitePiece')) {
                        killMoves.push(move)
                        possibleMovesUp.splice(possibleMovesUp.indexOf(move), possibleMovesUp.length - (possibleMovesUp.indexOf(move)));
                    }
                })
            }
            if(possibleMovesDown.length > 0) {
                possibleMovesDown.forEach(move => {
                    if(move && move.hasChildNodes() && move.firstChild.classList.contains('blackPiece')) {
                        possibleMovesDown.splice(possibleMovesDown.indexOf(move), possibleMovesDown.length - possibleMovesUp.indexOf(move));
                    } else if(move && move.hasChildNodes() && move.firstChild.classList.contains('whitePiece')) {
                        killMoves.push(move);
                        possibleMovesDown.splice(possibleMovesDown.indexOf(move), possibleMovesDown.length - possibleMovesDown.indexOf(move))
                    }
                })
            }
            if(possibleMovesLeft.length > 0) {
                possibleMovesLeft.forEach(move => {
                    if(move && move.hasChildNodes() && move.firstChild.classList.contains('blackPiece')) {
                        possibleMovesLeft.splice(possibleMovesLeft.indexOf(move), possibleMovesLeft.length - possibleMovesLeft.indexOf(move));
                    } else if(move && move.hasChildNodes() && move.firstChild.classList.contains('whitePiece')) {
                        killMoves.push(move);
                        possibleMovesLeft.splice(possibleMovesLeft.indexOf(move), possibleMovesLeft.length - possibleMovesLeft.indexOf(move));
                    }
                })
            }
            if(possibleMovesRight.length > 0) {
                possibleMovesRight.forEach(move => {
                    if(move && move.hasChildNodes() && move.firstChild.classList.contains('blackPiece')) {
                        possibleMovesRight.splice(possibleMovesRight.indexOf(move), possibleMovesRight.length - possibleMovesRight.indexOf(move));
                    } else if(move && move.hasChildNodes() && move.firstChild.classList.contains('whitePiece')){
                        killMoves.push(move);
                        possibleMovesRight.splice(possibleMovesRight.indexOf(move), possibleMovesRight.length - possibleMovesRight.indexOf(move));
                    }
                })
            }
            console.log(possibleMovesDown)
            console.log(possibleMovesLeft)
            console.log(possibleMovesRight)
            console.log(possibleMovesUp)
            console.log(killMoves)
            if(possibleMovesUp.length > 0) {
                possibleMovesUp.forEach(move => {
                    move.classList.add('possible');
                    move.addEventListener('click', function change(event) {
                        if(!chosen){
                            event.target.appendChild(rook);
                            rook.classList.replace(currentPos, move.id);
                            possibleMovesUp.forEach(pmU => {
                                pmU.classList.remove('possible')
                            })
                            possibleMovesDown.forEach(pmD => {
                                pmD.classList.remove('possible')
                            })
                            possibleMovesRight.forEach(pmR => {
                                pmR.classList.remove('possible')
                            })
                            possibleMovesLeft.forEach(pmL => {
                                pmL.classList.remove('possible')
                            })
                            killMoves.forEach(km => {
                                if(km && km.classList.contains('kill')) {
                                    km.classList.remove('kill');
                                    if(km.hasChildNodes()){
                                        km.firstChild.addEventListener('click', movePiece)
                                    }
                                }
                            })
                            chosen = true
                        }
                    }, {chosen: true})
                })
                change = true
            }
            if(possibleMovesDown.length > 0) {
                possibleMovesDown.forEach(move => {
                    move.classList.add('possible');
                    move.addEventListener('click', function change(event) {
                        if(!chosen){
                            event.target.appendChild(rook);
                            rook.classList.replace(currentPos, move.id);
                            possibleMovesUp.forEach(pmU => {
                                pmU.classList.remove('possible')
                            })
                            possibleMovesDown.forEach(pmD => {
                                pmD.classList.remove('possible')
                            })
                            possibleMovesRight.forEach(pmR => {
                                pmR.classList.remove('possible')
                            })
                            possibleMovesLeft.forEach(pmL => {
                                pmL.classList.remove('possible')
                            })
                            killMoves.forEach(km => {
                                if(km && km.classList.contains('kill')) {
                                    km.classList.remove('kill');
                                    if(km.hasChildNodes()){
                                        km.firstChild.addEventListener('click', movePiece)
                                    }
                                }
                            })
                            chosen = true
                        }
                    }, {chosen: true})
                })
                change = true
            }
            if(possibleMovesLeft.length > 0) {
                possibleMovesLeft.forEach(move => {
                    move.classList.add('possible');
                    move.addEventListener('click', function change(event) {
                        if(!chosen){
                            event.target.appendChild(rook);
                            rook.classList.replace(currentPos, move.id);
                            possibleMovesUp.forEach(pmU => {
                                pmU.classList.remove('possible')
                            })
                            possibleMovesDown.forEach(pmD => {
                                pmD.classList.remove('possible')
                            })
                            possibleMovesRight.forEach(pmR => {
                                pmR.classList.remove('possible')
                            })
                            possibleMovesLeft.forEach(pmL => {
                                pmL.classList.remove('possible')
                            })
                            killMoves.forEach(km => {
                                if(km && km.classList.contains('kill')) {
                                    km.classList.remove('kill');
                                    if(km.hasChildNodes()){
                                        km.firstChild.addEventListener('click', movePiece)
                                    }
                                }
                            })
                            chosen = true
                        }
                    }, {chosen: true})
                })
                change = true
            }
            if(possibleMovesRight.length > 0) {
                possibleMovesRight.forEach(move => {
                    move.classList.add('possible');
                    move.addEventListener('click', function change(event) {
                        if(!chosen){
                            event.target.appendChild(rook);
                            rook.classList.replace(currentPos, move.id);
                            possibleMovesUp.forEach(pmU => {
                                pmU.classList.remove('possible')
                            })
                            possibleMovesDown.forEach(pmD => {
                                pmD.classList.remove('possible')
                            })
                            possibleMovesRight.forEach(pmR => {
                                pmR.classList.remove('possible')
                            })
                            possibleMovesLeft.forEach(pmL => {
                                pmL.classList.remove('possible')
                            })
                            killMoves.forEach(km => {
                                if(km && km.classList.contains('kill')) {
                                    km.classList.remove('kill');
                                    if(km.hasChildNodes()){
                                        km.firstChild.addEventListener('click', movePiece)
                                    }
                                }
                            })
                            chosen = true
                        }
                    }, {chosen: true})
                })
                change = true
            }
            if(killMoves.length > 0) {
                killMoves.forEach(move => {
                    move.classList.add('kill');
                    move.firstChild.removeEventListener('click', movePiece)
                    move.addEventListener('click', function killPiece(event) {
                        if(!chosen){
                            move.removeChild(move.firstChild);
                            move.appendChild(rook);
                            rook.classList.replace(currentPos, move.id);
                            possibleMovesUp.forEach(pmU => {
                                pmU.classList.remove('possible')
                            })
                            possibleMovesDown.forEach(pmD => {
                                pmD.classList.remove('possible')
                            })
                            possibleMovesRight.forEach(pmR => {
                                pmR.classList.remove('possible')
                            })
                            possibleMovesLeft.forEach(pmL => {
                                pmL.classList.remove('possible')
                            })
                            killMoves.forEach(km => {
                                if(km && km.classList.contains('kill')) {
                                    km.classList.remove('kill');
                                    if(km.hasChildNodes()){
                                        km.firstChild.addEventListener('click', movePiece)
                                    }
                                }
                            })
                            chosen = true
                        }
                    }, {once:true})
                })
                change = true
            }
        } else if(event.target.classList.contains('knight')) {
            const knight = event.target;
            let currentPos = knight.classList[0];
            let currentCoordinate = convertSpaceToCoordinate(currentPos, spaceToCoordinate)
            let currentRow = parseInt(currentCoordinate[2]);
            let currentCol = parseInt(currentCoordinate[0]);
            let possibleMoves = [];
            let killMoves = [];
            let chosen = false;
            const moves = [
                [1, 2],
                [-1, 2],
                [2, 1],
                [2, -1],
                [1, -2],
                [-1, -2],
                [-2, 1],
                [-2, -1]
            ]
            for(let i = 0; i < moves.length; i++) {
                let move = moves[i];
                let newCol = currentCol + move[0];
                let newRow = currentRow + move[1];
                if(newCol > -1 && newCol < 8 && newRow > -1 && newRow < 8) {
                    let point = (newCol).toString() + ',' + (newRow).toString();
                    point = convertCoordinateToSpace(point, spaceToCoordinate)
                    let space = document.getElementById(point)
                    if(space && !space.hasChildNodes()) {
                        possibleMoves.push(space)
                    } else if(space && space.hasChildNodes() && space.firstChild.classList.contains('whitePiece')) {
                        killMoves.push(space)
                    }

                }
            }
            if(possibleMoves.length > 0) {
                possibleMoves.forEach(move => {
                    move.classList.add('possible');
                    move.addEventListener('click', function change(event) {
                        if(!chosen){
                            knight.classList.replace(currentPos, move.id);
                            event.target.appendChild(knight);
                            possibleMoves.forEach(pm => pm.classList.remove('possible'))
                            killMoves.forEach(km => {
                                if(km && km.classList.contains('kill')) {
                                    km.classList.remove('kill');
                                    if(km.hasChildNodes()) {
                                        km.firstChild.addEventListener('click', movePiece)
                                    }
                                }
                            })
                            chosen = true
                        }
                    }, {once: true})
                })
                change = true
            }
            if(killMoves.length > 0) {
                killMoves.forEach(move => {
                    move.classList.add('kill');
                    move.firstChild.removeEventListener('click', movePiece)
                    move.addEventListener('click', function killPiece(event) {
                        if(!chosen) {
                            move.removeChild(move.firstChild);
                            move.appendChild(knight);
                            knight.classList.replace(currentPos, move.id);
                            possibleMoves.forEach(pm => pm.classList.remove('possible'))
                            killMoves.forEach(km => {
                                if(km && km.classList.contains('kill')) {
                                    km.classList.remove('kill');
                                    if(km.hasChildNodes()){
                                        km.firstChild.addEventListener('click', movePiece);
                                    }
                                }
                            })
                            chosen = true
                        }
                    }, {once:true})
                })
                change = true
            }
        } else if(event.target.classList.contains('bishop')) {
            const bishop = event.target
            let currentPos = bishop.classList[0]
            let currentCoordinate = convertSpaceToCoordinate(currentPos, spaceToCoordinate)
            let currentCol = parseInt(currentCoordinate[0])
            let currentRow = parseInt(currentCoordinate[2])
            let possibleMovesUpRight = [];
            let possibleMovesUpLeft = [];
            let possibleMovesDownRight = [];
            let possibleMovesDownLeft = [];
            let killMoves = []
            let chosen = false;
            for(let i = 1; i < 8; i++) {
                if(currentCol + i < 8 && currentRow + i < 8) {
                    let move = convertCoordinateToSpace((currentCol + i).toString() + currentCoordinate[1] + (currentRow + i).toString(), spaceToCoordinate)
                    spaces.forEach(space => {
                        if(space.id === move) {
                            possibleMovesUpRight.push(space)
                        }
                    })
                }
                if(currentCol - i > -1 && currentRow + i < 8) {
                    let move = convertCoordinateToSpace((currentCol - i).toString() + currentCoordinate[1] + (currentRow + i).toString(), spaceToCoordinate)
                    spaces.forEach(space => {
                        if(space.id === move) {
                            possibleMovesUpLeft.push(space)
                        }
                    })
                }
                if(currentCol + i < 8 && currentRow - i > -1) {
                    let move = convertCoordinateToSpace((currentCol + i).toString() + currentCoordinate[1] + (currentRow - i).toString(), spaceToCoordinate)
                    spaces.forEach(space => {
                        if(space.id === move) {
                            possibleMovesDownRight.push(space)
                        }
                    })
                }
                if(currentCol - i > -1 && currentRow - i > -1) {
                    let move = convertCoordinateToSpace((currentCol - i).toString() + currentCoordinate[1] + (currentRow - i).toString(), spaceToCoordinate)
                    spaces.forEach(space => {
                        if(space.id === move) {
                            possibleMovesDownLeft.push(space)
                        }
                    })
                }
            }
            possibleMovesUpRight.forEach(move => {
                if(move && move.hasChildNodes() && move.firstChild.classList.contains('blackPiece')) {
                    possibleMovesUpRight.splice(possibleMovesUpRight.indexOf(move), possibleMovesUpRight.length - possibleMovesUpRight.indexOf(move));
                } else if(move && move.hasChildNodes() && move.firstChild.classList.contains('whitePiece')) {
                    killMoves.push(move);
                    possibleMovesUpRight.splice(possibleMovesUpRight.indexOf(move), possibleMovesUpRight.length - possibleMovesUpRight.indexOf(move));
                }
            })
            possibleMovesUpLeft.forEach(move => {
                if(move && move.hasChildNodes() && move.firstChild.classList.contains('blackPiece')) {
                    possibleMovesUpLeft.splice(possibleMovesUpLeft.indexOf(move), possibleMovesUpLeft.length - possibleMovesUpLeft.indexOf(move));
                } else if(move && move.hasChildNodes() && move.firstChild.classList.contains('whitePiece')) {
                    killMoves.push(move);
                    possibleMovesUpLeft.splice(possibleMovesUpLeft.indexOf(move), possibleMovesUpLeft.length - possibleMovesUpLeft.indexOf(move));
                }
            })
            possibleMovesDownRight.forEach(move => {
                if(move && move.hasChildNodes() && move.firstChild.classList.contains('blackPiece')) {
                    possibleMovesDownRight.splice(possibleMovesDownRight.indexOf(move), possibleMovesDownRight.length - possibleMovesDownRight.indexOf(move));
                } else if(move && move.hasChildNodes() && move.firstChild.classList.contains('whitePiece')) {
                    killMoves.push(move);
                    possibleMovesDownRight.splice(possibleMovesDownRight.indexOf(move), possibleMovesDownRight.length - possibleMovesDownRight.indexOf(move));
                }
            })
            possibleMovesDownLeft.forEach(move => {
                if(move && move.hasChildNodes() && move.firstChild.classList.contains('blackPiece')) {
                    possibleMovesDownLeft.splice(possibleMovesDownLeft.indexOf(move), possibleMovesDownLeft.length - possibleMovesDownLeft.indexOf(move));
                } else if(move && move.hasChildNodes() && move.firstChild.classList.contains('whitePiece')) {
                    killMoves.push(move);
                    possibleMovesDownLeft.splice(possibleMovesDownLeft.indexOf(move), possibleMovesDownLeft.length - possibleMovesDownLeft.indexOf(move));
                }
            })
            if(possibleMovesUpRight.length > 0) {
                possibleMovesUpRight.forEach(move => {
                    move.classList.add('possible')
                    move.addEventListener('click', function change(event){
                        if(!chosen){
                            bishop.classList.replace(currentPos, move.id);
                            event.target.appendChild(bishop);
                            possibleMovesUpRight.forEach(pmUR => pmUR.classList.remove('possible'))
                            possibleMovesUpLeft.forEach(pmUL => pmUL.classList.remove('possible'))
                            possibleMovesDownRight.forEach(pmDR => pmDR.classList.remove('possible'))
                            possibleMovesDownLeft.forEach(pmDL => pmDL.classList.remove('possible'))
                            killMoves.forEach(km => {
                                if(km && km.classList.contains('kill')) {
                                    km.classList.remove('kill');
                                    if(km.hasChildNodes()) {
                                        km.firstChild.addEventListener('click', movePiece)
                                    }
                                }
                            })
                            chosen = true
                        }
                    }, {once:true})
                })
                change = true
            }
            if(possibleMovesUpLeft.length > 0) {
                possibleMovesUpLeft.forEach(move => {
                    move.classList.add('possible')
                    move.addEventListener('click', function change(event){
                        if(!chosen){
                            bishop.classList.replace(currentPos, move.id);
                            event.target.appendChild(bishop);
                            possibleMovesUpRight.forEach(pmUR => pmUR.classList.remove('possible'))
                            possibleMovesUpLeft.forEach(pmUL => pmUL.classList.remove('possible'))
                            possibleMovesDownRight.forEach(pmDR => pmDR.classList.remove('possible'))
                            possibleMovesDownLeft.forEach(pmDL => pmDL.classList.remove('possible'))
                            killMoves.forEach(km => {
                                if(km && km.classList.contains('kill')) {
                                    km.classList.remove('kill');
                                    if(km.hasChildNodes()) {
                                        km.firstChild.addEventListener('click', movePiece)
                                    }
                                }
                            })
                            chosen = true
                        }
                    }, {once:true})
                })
                change = true
            }
            if(possibleMovesDownRight.length > 0) {
                possibleMovesDownRight.forEach(move => {
                    move.classList.add('possible')
                    move.addEventListener('click', function change(event){
                        if(!chosen){
                            bishop.classList.replace(currentPos, move.id);
                            event.target.appendChild(bishop);
                            possibleMovesUpRight.forEach(pmUR => pmUR.classList.remove('possible'))
                            possibleMovesUpLeft.forEach(pmUL => pmUL.classList.remove('possible'))
                            possibleMovesDownRight.forEach(pmDR => pmDR.classList.remove('possible'))
                            possibleMovesDownLeft.forEach(pmDL => pmDL.classList.remove('possible'))
                            killMoves.forEach(km => {
                                if(km && km.classList.contains('kill')) {
                                    km.classList.remove('kill');
                                    if(km.hasChildNodes()) {
                                        km.firstChild.addEventListener('click', movePiece)
                                    }
                                }
                            })
                            chosen = true
                        }
                    }, {once:true})
                })
                change = true
            }
            if(possibleMovesDownLeft.length > 0) {
                possibleMovesDownLeft.forEach(move => {
                    move.classList.add('possible')
                    move.addEventListener('click', function change(event){
                        if(!chosen){
                            bishop.classList.replace(currentPos, move.id);
                            event.target.appendChild(bishop);
                            possibleMovesUpRight.forEach(pmUR => pmUR.classList.remove('possible'))
                            possibleMovesUpLeft.forEach(pmUL => pmUL.classList.remove('possible'))
                            possibleMovesDownRight.forEach(pmDR => pmDR.classList.remove('possible'))
                            possibleMovesDownLeft.forEach(pmDL => pmDL.classList.remove('possible'))
                            killMoves.forEach(km => {
                                if(km && km.classList.contains('kill')) {
                                    km.classList.remove('kill');
                                    if(km.hasChildNodes()) {
                                        km.firstChild.addEventListener('click', movePiece)
                                    }
                                }
                            })
                            chosen = true
                        }
                    }, {once:true})
                })
                change = true
            }
            if(killMoves.length > 0) {
                killMoves.forEach(move => {
                    move.classList.add('kill');
                    move.firstChild.removeEventListener('click', movePiece)
                    move.addEventListener('click', function killPiece(event) {
                        if(!chosen) {
                            move.removeChild(move.firstChild);
                            move.appendChild(bishop);
                            bishop.classList.replace(currentPos, move.id);
                            possibleMovesUpRight.forEach(pmUR => pmUR.classList.remove('possible'))
                            possibleMovesUpLeft.forEach(pmUL => pmUL.classList.remove('possible'))
                            possibleMovesDownRight.forEach(pmDR => pmDR.classList.remove('possible'))
                            possibleMovesDownLeft.forEach(pmDL => pmDL.classList.remove('possible'))
                            killMoves.forEach(km => {
                                if(km && km.classList.contains('kill')) {
                                    km.classList.remove('kill');
                                    if(km.hasChildNodes()){
                                        km.firstChild.addEventListener('click', movePiece);
                                    }
                                }
                            })
                            chosen = true
                        }
                    }, {once:true})
                })
                change = true
            }
        }
        if(change) {
            turn = 'white';
        }
    }
}

//an array containing all of the squares
let spaces = new Array();
document.querySelectorAll('.square').forEach(square => spaces.push(square));

//an array containing any pieces on the board
let pieces = new Array();

//a function that makes and puts a chess piece on the board and makes all chess pieces clickable 
const makePiece = (piece, color, position) =>{
    let chessPiece = document.createElement('img');
    chessPiece.src = `./chessPieces/${piece}-${color}.svg`;
    chessPiece.classList.add(`${position}`, 'chessPiece', `${color}Piece`, `${piece}`);
    chessPiece.setAttribute('id', `${color}${piece}${position}`)
    document.getElementById(position).appendChild(chessPiece);
    pieces.push(chessPiece);
    for(let i = 0; i < pieces.length; i++) {
        let piece = pieces[i];
        if(piece.classList.contains('chessPiece')) {
            piece.addEventListener('click', movePiece);
        }
    }
}

//a function that puts all the pieces where they need to be at the beginning of the game
const setUpBoard = () => {
    spaces.forEach(space => {
        if(space.id[1] === '8') {
            if(space.id[0] === 'A' || space.id[0] === 'H') {
                makePiece('rook', 'black', space.id)
            } else if(space.id[0] === 'B' || space.id[0] === 'G') {
                makePiece('knight', 'black', space.id)
            } else if(space.id[0] === 'C' || space.id[0] === 'F') {
                makePiece('bishop', 'black', space.id)
            } else if(space.id[0] === 'D') {
                makePiece('queen', 'black', space.id)
            } else {
                makePiece('king', 'black', space.id)
            }
        } else if(space.id[1] === '7') {
            makePiece('pawn', 'black', space.id)
        } else if(space.id[1] === '2') {
            makePiece('pawn', 'white', space.id)
        } else if(space.id[1] === '1') {
            if(space.id[0] === 'A' || space.id[0] === 'H') {
                makePiece('rook', 'white', space.id)
            } else if(space.id[0] === 'B' || space.id[0] === 'G') {
                makePiece('knight', 'white', space.id)
            } else if(space.id[0] === 'C' || space.id[0] === 'F') {
                makePiece('bishop', 'white', space.id)
            } else if(space.id[0] === 'D') {
                makePiece('queen', 'white', space.id)
            } else {
                makePiece('king', 'white', space.id)
            }
        }
    })
}

//runs setUpBoard func when screen loads
setUpBoard();

console.log(pieces[0].id)


