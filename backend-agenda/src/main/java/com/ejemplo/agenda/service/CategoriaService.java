package com.ejemplo.agenda.service;

import com.ejemplo.agenda.model.Categoria;
import java.util.List;
import java.util.Optional;

public interface CategoriaService {
    List<Categoria> obtenerTodasLasCategorias();
    Optional<Categoria> obtenerCategoriaPorId(Long id);
    Categoria obtenerCategoriaPorNombre(String nombre);
    Categoria crearCategoria(Categoria categoria);
    Categoria actualizarCategoria(Long id, Categoria categoria);
    void eliminarCategoria(Long id);
    boolean existeCategoriaPorNombre(String nombre);
    List<Categoria> buscarCategoriasPorTermino(String termino);
}
