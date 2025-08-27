package com.ejemplo.agenda.model.enums;

public enum TipoTelefono {
    MOVIL("Móvil"),
    CASA("Casa"),
    TRABAJO("Trabajo"),
    FAX("Fax"),
    OTRO("Otro");
    
    private final String descripcion;
    
    TipoTelefono(String descripcion) {
        this.descripcion = descripcion;
    }
    
    public String getDescripcion() {
        return descripcion;
    }
    
    @Override
    public String toString() {
        return descripcion;
    }
}
