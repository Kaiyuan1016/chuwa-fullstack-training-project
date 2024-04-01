import React from 'react';
import { Result, Button } from 'antd';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <Result
      status="404"
      title="404"
      subTitle="Oops, something went wrong!"
      extra={
        <Link to="/">
          <Button type="primary" size="large">
            Go Home
          </Button>
        </Link>
      }
    />
  );
}