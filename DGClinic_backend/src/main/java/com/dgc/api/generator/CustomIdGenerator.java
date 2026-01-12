package com.dgc.api.generator;

import java.io.Serializable;
import java.util.UUID;

import org.hibernate.engine.spi.SharedSessionContractImplementor;
import org.hibernate.id.IdentifierGenerator;

public class CustomIdGenerator implements IdentifierGenerator {

	   @Override
	    public Serializable generate(SharedSessionContractImplementor session, Object object) {
	        // Example: Generate UUID with prefix
	        return "USR-" + UUID.randomUUID().toString().substring(0, 8);
	    }

}
