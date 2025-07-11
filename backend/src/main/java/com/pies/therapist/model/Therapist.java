package com.pies.therapist.model;

import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Transient;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/** Persistent entity representing a therapist account */
@Entity
@Table(name = "therapists")
@Getter @Setter @NoArgsConstructor
public class Therapist implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String firstName;
    private String lastName;

    @Column(unique = true, nullable = false)
    private String username;

    private String email;
    private String phoneNumber;

    /** Stored in DB: hashed password */
    private String passwordHash;

    @Transient
    private String password; // Raw password from request

    @Enumerated(EnumType.STRING)
    private TherapistRole role;

    private boolean activeStatus = true;
    private boolean enabled = true;

    /* ===== UserDetails implementation ===== */

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(() -> "ROLE_" + role.name());
    }

    @Override public String getPassword()            { return passwordHash; } // for Spring Security
    @Override public String getUsername()            { return username; }
    @Override public boolean isAccountNonExpired()   { return true; }
    @Override public boolean isAccountNonLocked()    { return true; }
    @Override public boolean isCredentialsNonExpired(){ return true; }
    @Override public boolean isEnabled()             { return enabled; }

    // Add this to access raw password in service logic
    public String getRawPassword() {
        return this.password;
    }
}
