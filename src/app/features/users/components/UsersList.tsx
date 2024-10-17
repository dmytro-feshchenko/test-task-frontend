import React, { useEffect, useState } from 'react';
import { Table, Button, Pagination } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../userSlice';
import AddUserModal from './AddUserModal';
import { RootState } from '../../../store';

const UserList: React.FC = () => {
    const dispatch = useDispatch();
    const { users, loading } = useSelector((state: RootState) => state.users);

    const [currentPage, setCurrentPage] = useState(1);
    const [isModalVisible, setIsModalVisible] = useState(false);

    useEffect(() => {
        // @ts-ignore
        dispatch(fetchUsers(currentPage));
    }, [dispatch, currentPage]);

    const handleAddUserClick = () => {
        setIsModalVisible(true);
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        // @ts-ignore
        dispatch(fetchUsers(page));
    };

    return (
        <div>
            <Button type="primary" onClick={handleAddUserClick}>
                Add a new user
            </Button>
            <Table dataSource={users} loading={loading} rowKey="id">
                <Table.Column title="Name" dataIndex="name" />
                <Table.Column title="Role" dataIndex="role" />
                <Table.Column title="Email" dataIndex="email" />
                <Table.Column title="Created at" dataIndex="created_at" />
                <Table.Column title="Updated at" dataIndex="updated_at" />
            </Table>
            <Pagination current={currentPage} onChange={handlePageChange} total={15} />

            <AddUserModal visible={isModalVisible} onClose={() => setIsModalVisible(false)} />
        </div>
    );
};

export default UserList;