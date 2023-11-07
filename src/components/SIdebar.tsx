import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import './Sidebar.css';

const Sidebar = () => {
  const [searchParams] = useSearchParams();
  const todosData = searchParams.get('todos');
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className='sdebar'>
    <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
      <button className="close-btn" onClick={toggleSidebar}>
        <FontAwesomeIcon icon={faTimes} />
      </button>
      <ul>
        <li>
          <Link to="/" className={todosData === null ? 'active' : ''}>
            All Todo
          </Link>
        </li>
        <li>
          <Link to="/?todos=active" className={todosData === 'active' ? 'active' : ''}>
            Active
          </Link>
        </li>
        <li>
          <Link to="/?todos=completed" className={todosData === 'completed' ? 'active' : ''}>
            Completed
          </Link>
        </li>
      </ul>
    </aside>
    </div>
  );
}

export default Sidebar;
