import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Container, Box, Typography, Snackbar, Alert } from "@mui/material";
import { useEffect, useState } from "react";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
// import TodoItem from "./components/TodoItem";

// const darkTheme = createTheme({
//     palette: {
//         mode: "dark",
//     },
// });

function App() {
    const [todos, setTodos] = useState([]);
    const [priority, setPriority] = useState("medium");
    const [inputValue, setInputValue] = useState("");
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [newTodoText, setNewTodoText] = useState("");

    useEffect(() => {
        fetch("/src/assets/data.json")
            .then((response) => response.json())
            .then((data) => setTodos(data))
            .catch((error) => console.error("Error fetching data:", error));
    }, []);

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handlePriorityChange = (e) => {
        setPriority(e.target.value);
    };

    const handleAddTodo = () => {
        if (inputValue.trim()) {
            const newTodo = { task: inputValue, priority: priority, isDone: false };
            setTodos([...todos, newTodo]);
            setNewTodoText(inputValue);
            setSnackbarOpen(true);
            setInputValue("");
        }
    };

    const handleToggleTodo = (index) => {
        setTodos(
            todos.map((todo, i) =>
                i === index ? { ...todo, isDone: !todo.isDone } : todo
            )
        );
    };

    const handleSnackbarClose = (_, reason) => {
        if (reason === "clickaway") return;
        setSnackbarOpen(false);
    };

    return (
        <Box
            sx={{
                minHeight: "100vh",
                width: "100vw",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <Container
                maxWidth="md"
                sx={{
                    py: 4,
                    width: "60%",
                    minWidth: "800px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    margin: "0 auto",
                }}
            >
                <Typography
                    variant="h4"
                    component="h1"
                    gutterBottom
                    align="center"
                    fontWeight="bold"
                >
                    NEXT Todo App
                </Typography>

                <TodoForm
                    inputValue={inputValue}
                    handleInputChange={handleInputChange}
                    handleAddTodo={handleAddTodo}
                    handlePriorityChange={handlePriorityChange}
                    priority={priority}
                />

                <TodoList todos={todos} handleToggleTodo={handleToggleTodo} />

                <Snackbar
                    open={snackbarOpen}
                    autoHideDuration={3000}
                    onClose={handleSnackbarClose}
                    anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                >
                    <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: "100%" }}>
                        "{newTodoText}" 할 일이 추가되었습니다.
                    </Alert>
                </Snackbar>
            </Container>
        </Box>
    );
}

export default App;
