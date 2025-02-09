import { useEffect, useState } from "react";
import { Divider } from "@mui/material";
import { fetchRoutes } from "./store/routesThunk";
import { useDispatch } from "react-redux";
import { AppDispatch } from "./store";
import Header from "./components/Header";
import styled from "styled-components";
import RoutesLayout from "./components/RoutesLayout";
import ModalAddPath from "./components/modalAddPath";

const Container = styled.div`
  max-width: 900px;
  margin: auto;
`;

const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [isOpenModal, setIsOpenModal] = useState(false);

  useEffect(() => {
    dispatch(fetchRoutes());
  }, [dispatch]);

  return (
    <Container>
      <Header setIsOpenModal={setIsOpenModal} />
      <Divider />
      <RoutesLayout />
      <ModalAddPath isOpenModal={isOpenModal} setIsOpenModal={setIsOpenModal} />
    </Container>
  );
};

export default App;
