import React from "react";
import { useParams, Navigate } from "react-router-dom";
import ItemDetail from "../components/ItemDetail";

const ItemDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return <Navigate to="/item/all" replace />;
  }

  return (
    <ItemDetail itemId={id} open={true} onClose={() => window.history.back()} />
  );
};

export default ItemDetailPage;
