import React from 'react';
import NavBar from '../../Components/NavBar';
import NewUserForm from '../../Components/NewUserForm/NewUserForm';

export default function AdminManage() {
  return (
    <div>
      <NavBar
        className1="activePage"
        name1="GERENCIAR USUÁRIOS"
        link1="/admin/manage"
        currentPage="admin_menage__"
      />
      <NewUserForm />
      <h3>Lista de usuários</h3>
    </div>
  );
}
