package com.ejemplo.agenda.repository;

import com.ejemplo.agenda.model.Contacto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ContactoRepository extends JpaRepository<Contacto, Long> {
    Page<Contacto> findAll(Pageable pageable);
    
    List<Contacto> findByNombreContainingIgnoreCase(String nombre);
    
    List<Contacto> findByApellidoContainingIgnoreCase(String apellido);
    
    List<Contacto> findByTelefonoContaining(String telefono);
    
    List<Contacto> findByEmailContainingIgnoreCase(String email);
    
    List<Contacto> findByCategoriaNombre(String categoria);
    
    List<Contacto> findByFavorito(boolean favorito);
    
    @Query("SELECT c FROM Contacto c WHERE LOWER(c.nombre) LIKE LOWER(CONCAT('%', :termino, '%')) OR " +
           "LOWER(c.apellido) LIKE LOWER(CONCAT('%', :termino, '%')) OR " +
           "c.telefono LIKE CONCAT('%', :termino, '%') OR " +
           "LOWER(c.email) LIKE LOWER(CONCAT('%', :termino, '%'))")
    List<Contacto> buscarPorTermino(@Param("termino") String termino);
}