package com.ejemplo.agenda.service;

import com.ejemplo.agenda.model.Contacto;
import com.ejemplo.agenda.model.dto.ContactoRequest;
import com.ejemplo.agenda.model.dto.ContactoResponse;
import org.springframework.data.domain.Page;

import java.util.List;

public interface ContactoService {
    Page<ContactoResponse> obtenerTodosContactos(int pagina, int tamaño);
    ContactoResponse obtenerContactoPorId(Long id);
    ContactoResponse crearContacto(ContactoRequest contactoRequest);
    ContactoResponse actualizarContacto(Long id, ContactoRequest contactoRequest);
    void eliminarContacto(Long id);
    List<ContactoResponse> buscarPorNombre(String nombre);
    List<ContactoResponse> buscarPorTermino(String termino);
    List<ContactoResponse> obtenerContactosPorCategoria(String categoria);
    List<ContactoResponse> obtenerContactosFavoritos();
    ContactoResponse toggleFavorito(Long id, boolean favorito);
}