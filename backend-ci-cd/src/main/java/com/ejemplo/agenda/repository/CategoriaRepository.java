package com.ejemplo.agenda.repository;

import com.ejemplo.agenda.model.Categoria;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CategoriaRepository extends JpaRepository<Categoria, Long> {
    
    Optional<Categoria> findByNombre(String nombre);
    
    boolean existsByNombre(String nombre);
    
    List<Categoria> findByNombreContainingIgnoreCase(String nombre);
    
    @Query("SELECT c FROM Categoria c WHERE LOWER(c.nombre) LIKE LOWER(CONCAT('%', :termino, '%')) OR " +
           "LOWER(c.descripcion) LIKE LOWER(CONCAT('%', :termino, '%'))")
    List<Categoria> buscarPorTermino(@Param("termino") String termino);
    
    @Query("SELECT c FROM Categoria c ORDER BY c.nombre ASC")
    List<Categoria> findAllOrderByNombre();
}
