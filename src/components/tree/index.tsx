// import cn from 'classnames';
// import { uniqueId } from 'lodash';
// import { useCallback, useContext, useEffect, useRef, useState } from 'react';

// import IconChevron from 'assets/chevron.svg?react';
// import IconFolder from 'assets/folder.svg?react';

// import CreateFolderContext from 'contexts/createFolderContext';

// import styles from './styles.module.scss';

// type Node = {
//   children?: Array<Node>;
//   id: string;
//   name: string;
//   type: 'file' | 'folder';
// };

// const renderTree = (
//   data: Array<Node>,
//   expandedFolders: Map<string, boolean>,
//   createFolder: null | string,
//   toggleFolder: (id: string) => void,
// ) => {
//   return data?.map(({ children, id, name, type }: Node) => {
//     const isExpanded = expandedFolders?.get(id) || false;

//     switch (type) {
//       case 'folder':
//         return (
//           <div
//             className={cn(styles.folder, { [styles.folderActive]: isExpanded })}
//             key={id}
//             onClick={() => toggleFolder(id)}
//           >
//             <button>
//               <IconChevron style={{ transform: isExpanded ? 'rotate(90deg)' : 'rotate(0)' }} />
//               <IconFolder />
//               <span>{name}</span>
//             </button>
//             {isExpanded && children && (
//               <div
//                 className={cn(styles.childrenFolder, { [styles.expanded]: isExpanded })}
//                 key={id}
//               >
//                 {renderTree(children, expandedFolders, createFolder, toggleFolder)}
//               </div>
//             )}
//           </div>
//         );
//       default:
//         return (
//           <button
//             className={styles.file}
//             key={id}
//           >
//             <span>{name}</span>
//           </button>
//         );
//     }
//   });
// };

// const Tree = () => {
//   const [nameFolder, setNameFolder] = useState<string>('');
//   const [expandedFolders, setExpandedFolders] = useState<Map<string, boolean>>(new Map());
//   const [data, setData] = useState(localStorage.getItem('data') || []);
//   const [errorText, setErrorText] = useState<string>('');

//   console.log('data', data);

//   const [createFolder, setCreateFolder] = useContext(CreateFolderContext);

//   const inputRef = useRef(null);

//   const handleMouseDown = useCallback(
//     (event) => {
//       if (inputRef.current && !inputRef.current.contains(event.target) && nameFolder) {
//         const newObj = {
//           children: [],
//           id: uniqueId(),
//           name: nameFolder,
//           type: 'folder',
//         };
//         setData((prevData) => [...prevData, newObj]);
//         localStorage.setItem('data', JSON.stringify([...data, newObj]));
//         setNameFolder('');
//         setCreateFolder(null);
//       }
//     },
//     [data, nameFolder, setCreateFolder],
//   );

//   const handleKeyDown = (event) => {
//     if (event.key === 'Enter') {
//       setErrorText('необходимо ввести название файла или папки');
//     }
//     if (event.key === 'Enter' && nameFolder) {
//       setErrorText('');
//       const newObj = {
//         children: [],
//         id: uniqueId(),
//         name: nameFolder,
//         type: 'folder',
//       };
//       setData((prevData) => [...prevData, newObj]);
//       localStorage.setItem('data', JSON.stringify([...data, newObj]));
//       setNameFolder('');
//       setCreateFolder(null);
//     }
//     if (event.key === 'Escape') {
//       setErrorText('');
//       setNameFolder('');
//       setCreateFolder(null);
//     }
//   };

//   useEffect(() => {
//     document.addEventListener('mousedown', handleMouseDown);
//     return () => {
//       document.removeEventListener('mousedown', handleMouseDown);
//     };
//   }, [handleMouseDown]);

//   const toggleFolder = (id: string) => {
//     setExpandedFolders((prevExpandedFolders) => {
//       const newExpandedFolders = new Map(prevExpandedFolders);
//       newExpandedFolders.set(id, !newExpandedFolders.get(id));
//       return newExpandedFolders;
//     });
//   };

//   return (
//     <div className={styles.wrapper}>
//       {createFolder && (
//         <div className={styles.input}>
//           <IconFolder />
//           <input
//             autoFocus
//             onChange={({ target }) => setNameFolder(target.value)}
//             onKeyDown={handleKeyDown}
//             ref={inputRef}
//             value={nameFolder}
//           />
//           {errorText && <div className={styles.errorText}>{errorText}</div>}
//         </div>
//       )}
//       {renderTree(data, expandedFolders, createFolder, toggleFolder)}
//     </div>
//   );
// };

// export default Tree;
