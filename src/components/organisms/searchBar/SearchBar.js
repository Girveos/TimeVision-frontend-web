import React from 'react';
import './SearchBar.css';
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const SearchBar = ({ searchTerm, onSearchChange, placeholder }) => {
  return (
    <div className="search-bar">   
      <Input
        type="text"
        className='input-search-bar'
        placeholder={placeholder}
        value={searchTerm}
        onChange={onSearchChange}
        suffix={
          <SearchOutlined className="search-icon" />
        }
      />
    </div>
  );
};

export default SearchBar;