from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field, ValidationError
from typing import List, Dict

app = FastAPI()

origins = [
    "http://localhost:3000",
    "http://localhost:8000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get('/')
def read_root():
    return {'Ping': 'Pong'}

class Edge(BaseModel):
    id: str
    source: str
    target: str

class Node(BaseModel):
    id: str
    type: str
    data: Dict[str, str]

class Pipeline(BaseModel):
    nodes: List[Node] = Field(...)
    edges: List[Edge] = Field(...)

@app.post('/pipelines/parse')
def parse_pipeline(pipeline: Pipeline):
    num_nodes = len(pipeline.nodes)
    num_edges = len(pipeline.edges)

    graph = {node.id: [] for node in pipeline.nodes}
    for edge in pipeline.edges:
        if edge.source not in graph or edge.target not in graph:
            raise HTTPException(status_code=400, detail="Edge references nonexistent node")
        graph[edge.source].append(edge.target)

    def is_cyclic(v, visited, stack):
        visited[v] = True
        stack[v] = True

        for neighbour in graph[v]:
            if not visited[neighbour]:
                if is_cyclic(neighbour, visited, stack):
                    return True
            elif stack[neighbour]:
                return True

        stack[v] = False
        return False

    def is_dag(graph):
        visited = {node: False for node in graph}
        stack = {node: False for node in graph}

        for node in graph:
            if not visited[node]:
                if is_cyclic(node, visited, stack):
                    return False
        return True

    is_dag = is_dag(graph)

    return {'num_nodes': num_nodes, 'num_edges': num_edges, 'is_dag': is_dag}
