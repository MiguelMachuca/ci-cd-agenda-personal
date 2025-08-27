package com.ejemplo.agenda.service.impl;

import com.ejemplo.agenda.model.Categoria;
import com.ejemplo.agenda.repository.CategoriaRepository;
import com.ejemplo.agenda.service.CategoriaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class CategoriaServiceImpl implements CategoriaService {
    
    @Autowired
    private CategoriaRepository categoriaRepository;
    
    @Override
    public List<Categoria> obtenerTodasLasCategorias() {
        return categoriaRepository.findAll();
    }
    
    @Override
    public Optional<Categoria> obtenerCategoriaPorId(Long id) {
        return categoriaRepository.findById(id);
    }
    
    @Override
    public Categoria obtenerCategoriaPorNombre(String nombre) {
        return categoriaRepository.findByNombre(nombre)
                .orElseThrow(() -> new EntityNotFoundException("Categoría no encontrada: " + nombre));
    }
    
    @Override
    public Categoria crearCategoria(Categoria categoria) {
        if (existeCategoriaPorNombre(categoria.getNombre())) {
            throw new IllegalArgumentException("Ya existe una categoría con el nombre: " + categoria.getNombre());
        }
        return categoriaRepository.save(categoria);
    }
    
    @Override
    public Categoria actualizarCategoria(Long id, Categoria categoria) {
        Categoria categoriaExistente = categoriaRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Categoría no encontrada con ID: " + id));
        
        // Verificar si el nuevo nombre ya existe en otra categoría
        if (!categoriaExistente.getNombre().equals(categoria.getNombre()) && 
            existeCategoriaPorNombre(categoria.getNombre())) {
            throw new IllegalArgumentException("Ya existe una categoría con el nombre: " + categoria.getNombre());
        }
        
        categoriaExistente.setNombre(categoria.getNombre());
        categoriaExistente.setColor(categoria.getColor());
        categoriaExistente.setDescripcion(categoria.getDescripcion());
        
        return categoriaRepository.save(categoriaExistente);
    }
    
    @Override
    public void eliminarCategoria(Long id) {
        Categoria categoria = categoriaRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Categoría no encontrada con ID: " + id));
        
        // Verificar si la categoría tiene contactos asociados
        if (!categoria.getContactos().isEmpty()) {
            throw new IllegalStateException("No se puede eliminar la categoría porque tiene contactos asociados");
        }
        
        categoriaRepository.deleteById(id);
    }
    
    @Override
    public boolean existeCategoriaPorNombre(String nombre) {
        return categoriaRepository.existsByNombre(nombre);
    }
    
    @Override
    public List<Categoria> buscarCategoriasPorTermino(String termino) {
        return categoriaRepository.findByNombreContainingIgnoreCase(termino);
    }
}
